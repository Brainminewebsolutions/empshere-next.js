import "server-only";
import { randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from "node:crypto";

// Password hashing with Node's built-in scrypt (no native modules, works on
// shared hosting). Stored as: scrypt$N$r$p$<salt b64>$<hash b64>
// The cost parameters live in the string, so they can be raised later
// without invalidating existing passwords.
const N = 16384;
const R = 8;
const P = 1;
const KEYLEN = 64;

function derive(password: string, salt: Buffer, n: number, r: number, p: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const opts: ScryptOptions = { N: n, r, p, maxmem: 128 * n * r * 2 };
    scryptCb(password, salt, KEYLEN, opts, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt, N, R, P);
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [, n, r, p, saltB64, hashB64] = parts;
  try {
    const expected = Buffer.from(hashB64, "base64");
    const actual = await derive(password, Buffer.from(saltB64, "base64"), Number(n), Number(r), Number(p));
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
