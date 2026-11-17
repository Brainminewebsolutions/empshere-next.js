// Creates (or resets) an admin login. Works with MySQL and Postgres.
//
//   node --env-file=.env.local scripts/create-admin.mjs admin@yourdomain.com "Your Name" "OptionalPassword1!"
//
// - Reads the same DB_* / DATABASE_URL variables as the website.
// - If no password is given, a random one is generated and printed ONCE.
// - If the email already exists, its password is reset and it is made an admin.
// - Plain usernames are fine too: "admin" is stored as "admin@<USERNAME_DOMAIN>"
//   (see app/admin/_actions/validation.ts), so pass the full email here.
import { randomBytes, randomUUID, scrypt } from "node:crypto";

const [email, fullName = "Admin", given] = process.argv.slice(2);
if (!email || !email.includes("@")) {
  console.error('Usage: node --env-file=.env.local scripts/create-admin.mjs <email> ["Full Name"] ["Password"]');
  process.exit(1);
}
const login = email.trim().toLowerCase();
const password = given || randomBytes(12).toString("base64url") + "aA1!";

const N = 16384, R = 8, P = 1;
function hash(pw) {
  const salt = randomBytes(16);
  return new Promise((res, rej) =>
    scrypt(pw, salt, 64, { N, r: R, p: P, maxmem: 128 * N * R * 2 }, (e, key) =>
      e ? rej(e) : res(`scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${key.toString("base64")}`),
    ),
  );
}

const url = process.env.DATABASE_URL || "";
const t = (process.env.DB_TYPE || "").toLowerCase();
const isPg = /^(postgres|postgresql|pg|supabase)$/.test(t) || (!t && /^postgres(ql)?:\/\//i.test(url));
const now = new Date().toISOString().replace("T", " ").replace("Z", "").slice(0, 19);
const passwordHash = await hash(password);
const id = randomUUID();

try {
  if (isPg) {
    const { default: pg } = await import("pg");
    const host = url ? new URL(url).hostname : process.env.DB_HOST || "localhost";
    const remote = !["localhost", "127.0.0.1", "::1"].includes(host);
    const ssl = process.env.DB_SSL === "false" ? false : process.env.DB_SSL === "true" || remote ? { rejectUnauthorized: false } : false;
    const client = new pg.Client(
      url
        ? { connectionString: url, ssl }
        : { host, port: Number(process.env.DB_PORT) || 5432, database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD, ssl },
    );
    await client.connect();
    await client.query(
      `INSERT INTO users (id, email, full_name, role, password_hash, created_at) VALUES ($1, $2, $3, 'admin', $4, $5)
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'admin'`,
      [id, login, fullName, passwordHash, now],
    );
    await client.end();
  } else {
    const mysql = (await import("mysql2/promise")).default;
    const conn = url
      ? await mysql.createConnection({ uri: url })
      : await mysql.createConnection({
          host: process.env.DB_HOST || "localhost",
          port: Number(process.env.DB_PORT) || 3306,
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
        });
    await conn.query(
      `INSERT INTO users (id, email, full_name, role, password_hash, created_at) VALUES (?, ?, ?, 'admin', ?, ?)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = 'admin'`,
      [id, login, fullName, passwordHash, now],
    );
    await conn.end();
  }
} catch (err) {
  console.error("Could not create the admin:", err.code || "", err.message);
  console.error("Check the DB_* / DATABASE_URL values and that the SQL file was run (tables must exist).");
  process.exit(1);
}

console.log(`\nAdmin ready.\n  Login:    ${login}\n  Password: ${password}\n\nSave the password now (it is not stored in plain text). Change it at /admin/account after logging in.\n`);
