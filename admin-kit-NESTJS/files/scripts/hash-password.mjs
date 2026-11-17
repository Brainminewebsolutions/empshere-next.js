// Prints a password hash for pasting into phpMyAdmin (users.password_hash).
//   node scripts/hash-password.mjs "NewPassword123!"
import { randomBytes, scrypt } from "node:crypto";
const pw = process.argv[2];
if (!pw) { console.error('Usage: node scripts/hash-password.mjs "<password>"'); process.exit(1); }
const N = 16384, R = 8, P = 1;
const salt = randomBytes(16);
scrypt(pw, salt, 64, { N, r: R, p: P, maxmem: 128 * N * R * 2 }, (e, key) => {
  if (e) throw e;
  console.log(`scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${key.toString("base64")}`);
});
