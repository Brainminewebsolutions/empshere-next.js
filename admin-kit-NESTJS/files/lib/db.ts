import "server-only";
import mysql, { type Pool as MySqlPool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";
import { Pool as PgPool, types as pgTypes } from "pg";

// One small data layer for the whole admin. Everything else calls only
// query / queryOne / exec / count below, with "?" placeholders.
//
// Two databases are supported (choose with DB_TYPE, or let DATABASE_URL decide):
//   mysql     MySQL / MariaDB: Hostinger, cPanel, PlanetScale-style hosts, RDS, local
//   postgres  PostgreSQL: Supabase, Neon, Railway, Render, RDS, local
//
// Environment variables (server-only; never prefix them with NEXT_PUBLIC_):
//   DB_TYPE       "mysql" (default) or "postgres"
//   DATABASE_URL  optional single connection string. Overrides the DB_* values.
//                 mysql://user:pass@host:3306/dbname
//                 postgresql://user:pass@host:5432/postgres
//   DB_HOST (default "localhost"), DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
//   DB_SSL        "true" / "false". Postgres defaults to true for remote hosts.
//   DB_POOL_SIZE  default 5 (keep it small on shared hosting / Supabase pooler)
//
// DATETIME values are stored in UTC and read back as plain strings; convert
// them with toIso() so there is no timezone guessing.

export type DbType = "mysql" | "postgres";

declare global {
  var __adminDbPool: MySqlPool | PgPool | undefined;
}

type Param = string | number | boolean | Date | null | Buffer | (string | number)[];
export type ExecResult = { insertId: number; affectedRows: number };

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}. See admin-kit/README.md.`);
  return value;
}

export function dbType(): DbType {
  const explicit = (process.env.DB_TYPE || "").toLowerCase();
  if (explicit === "postgres" || explicit === "postgresql" || explicit === "pg" || explicit === "supabase") return "postgres";
  if (explicit === "mysql" || explicit === "mariadb") return "mysql";
  const url = process.env.DATABASE_URL || "";
  if (/^postgres(ql)?:\/\//i.test(url)) return "postgres";
  return "mysql";
}

const poolSize = () => Number(process.env.DB_POOL_SIZE) || 5;

function createMySqlPool(): MySqlPool {
  const shared = {
    charset: "utf8mb4",
    timezone: "Z",
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: poolSize(),
    queueLimit: 50,
    connectTimeout: 10_000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10_000,
  };
  const url = process.env.DATABASE_URL;
  if (url) return mysql.createPool({ uri: url, ...shared });
  return mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    database: required("DB_NAME"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    ...shared,
  });
}

function createPgPool(): PgPool {
  // Return timestamps as plain "YYYY-MM-DD HH:MM:SS" strings (like MySQL dateStrings).
  pgTypes.setTypeParser(1114, (v) => v);
  pgTypes.setTypeParser(1184, (v) => v);

  const url = process.env.DATABASE_URL;
  const host = url ? new URL(url).hostname : process.env.DB_HOST || "localhost";
  const remote = !["localhost", "127.0.0.1", "::1"].includes(host);
  const sslEnv = process.env.DB_SSL;
  const ssl = sslEnv === "false" ? false : sslEnv === "true" || remote ? { rejectUnauthorized: false } : false;
  const shared = { max: poolSize(), ssl, connectionTimeoutMillis: 10_000, idleTimeoutMillis: 30_000 };

  if (url) return new PgPool({ connectionString: url, ...shared });
  return new PgPool({
    host,
    port: Number(process.env.DB_PORT) || 5432,
    database: required("DB_NAME"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    ...shared,
  });
}

// One pool per server process (survives hot reloads in development).
function pool(): MySqlPool | PgPool {
  if (!globalThis.__adminDbPool) globalThis.__adminDbPool = dbType() === "postgres" ? createPgPool() : createMySqlPool();
  return globalThis.__adminDbPool;
}

// ---- MySQL-style SQL -> Postgres ------------------------------------------
// The admin's SQL is written once with "?" placeholders. For Postgres this
// rewrites "?" to $1, $2..., "IN (?)" with an array to "= ANY($n)", dates to
// UTC strings, and appends RETURNING id to the media insert (for insertId).
const pgDate = (d: Date) => d.toISOString().replace("T", " ").replace("Z", "");

function toPg(sql: string, params: Param[]): { text: string; values: unknown[] } {
  const values: unknown[] = [];
  let text = "";
  let inString = false;
  let p = 0;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'") inString = !inString;
    if (ch === "`" && !inString) {
      text += '"';
      continue;
    }
    if (ch !== "?" || inString) {
      text += ch;
      continue;
    }
    const value = params[p++];
    if (Array.isArray(value) && /\bIN\s*\($/i.test(text) && sql[i + 1] === ")") {
      text = text.replace(/\bIN\s*\($/i, "");
      values.push(value.map(String));
      text += `= ANY($${values.length})`;
      i++; // skip the closing ")"
      continue;
    }
    values.push(value instanceof Date ? pgDate(value) : value);
    text += `$${values.length}`;
  }
  text = text.replace(/UTC_TIMESTAMP\(\)/gi, "(now() at time zone 'utc')");
  if (/^\s*INSERT\s+INTO\s+media\b/i.test(text)) text += " RETURNING id";
  return { text, values };
}

export async function query<T = Record<string, unknown>>(sql: string, params: Param[] = []): Promise<T[]> {
  const p = pool();
  if (p instanceof PgPool) {
    const q = toPg(sql, params);
    return (await p.query(q.text, q.values)).rows as T[];
  }
  const [rows] = await p.query<RowDataPacket[]>(sql, params);
  return rows as unknown as T[];
}

export async function queryOne<T = Record<string, unknown>>(sql: string, params: Param[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function exec(sql: string, params: Param[] = []): Promise<ExecResult> {
  const p = pool();
  if (p instanceof PgPool) {
    const q = toPg(sql, params);
    const res = await p.query(q.text, q.values);
    return { insertId: Number((res.rows[0] as { id?: number | string } | undefined)?.id ?? 0), affectedRows: res.rowCount ?? 0 };
  }
  const [result] = await p.query<ResultSetHeader>(sql, params);
  return { insertId: result.insertId, affectedRows: result.affectedRows };
}

export async function count(sql: string, params: Param[] = []): Promise<number> {
  const row = await queryOne<{ n: number | string }>(sql, params);
  return Number(row?.n ?? 0);
}

// "2026-11-13 10:05:00" (UTC) -> "2026-11-13T10:05:00.000Z"
export function toIso(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const d = new Date(value.replace(" ", "T") + "Z");
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

const codeOf = (err: unknown) => (err as { code?: string })?.code;

export const isDuplicateError = (err: unknown) => codeOf(err) === "ER_DUP_ENTRY" || codeOf(err) === "23505";
export const isMissingTableError = (err: unknown) => codeOf(err) === "ER_NO_SUCH_TABLE" || codeOf(err) === "42P01";

// Friendly message instead of a stack trace when the database is unreachable
// or not set up. Shown on the login page, so it never includes secrets.
export function describeDbError(err: unknown): string {
  const e = err as { code?: string; message?: string };
  switch (e?.code) {
    case "ECONNREFUSED":
    case "ENOTFOUND":
    case "ETIMEDOUT":
    case "EHOSTUNREACH":
    case "ECONNRESET":
      return "Cannot reach the database. Check DB_HOST / DB_PORT (or DATABASE_URL). On Hostinger use \"localhost\"; from elsewhere the host must allow remote access.";
    case "ER_ACCESS_DENIED_ERROR":
    case "28P01":
    case "28000":
      return "The database rejected the username or password (check DB_USER / DB_PASSWORD or DATABASE_URL).";
    case "ER_BAD_DB_ERROR":
    case "3D000":
      return "Database not found (check DB_NAME or DATABASE_URL).";
    case "ER_NO_SUCH_TABLE":
    case "42P01":
      return "Database tables are missing. Run the SQL file for your database (database/mysql.sql or database/postgres.sql).";
    default:
      if (/self.signed|SSL|certificate/i.test(e?.message ?? "")) return "SSL problem connecting to the database. Try DB_SSL=true (or false for a local database).";
      return e?.message ?? "Database error.";
  }
}
