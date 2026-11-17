#!/usr/bin/env node
// Creates / upgrades the admin tables on the database in .env.local.
//   node --env-file=.env.local scripts/setup-db.mjs
// Safe to run again: every table is CREATE IF NOT EXISTS, and columns added
// after the first release (categories, tags, image size...) are added only
// when missing. It never deletes data.
import { readFileSync } from "node:fs";
import mysql from "mysql2/promise";

const need = (n) => {
  if (!process.env[n]) throw new Error(`Missing environment variable ${n}`);
  return process.env[n];
};

const conn = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: need("DB_NAME"),
  user: need("DB_USER"),
  password: need("DB_PASSWORD"),
  charset: "utf8mb4",
  multipleStatements: true,
  connectTimeout: 15000,
});

const sql = readFileSync(new URL("../database/mysql.sql", import.meta.url), "utf8");
await conn.query(sql);

// Columns added after the original kit schema. [table, column, definition]
const upgrades = [
  ["posts", "featured_image_width", "INT NULL"],
  ["posts", "featured_image_height", "INT NULL"],
  ["posts", "featured_image_srcset", "TEXT NULL"],
  ["posts", "categories", "LONGTEXT NULL"],
  ["posts", "tags", "LONGTEXT NULL"],
  ["posts", "word_count", "INT NOT NULL DEFAULT 0"],
];
for (const [table, column, def] of upgrades) {
  const [rows] = await conn.query(
    "SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?",
    [table, column],
  );
  if (rows.length === 0) {
    await conn.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${def}`);
    console.log(`added ${table}.${column}`);
  }
}
// Slugs of imported WordPress posts can be longer than the original 100.
await conn.query("ALTER TABLE `posts` MODIFY `slug` VARCHAR(190) NOT NULL");
await conn.query("ALTER TABLE `post_redirects` MODIFY `old_slug` VARCHAR(190) NOT NULL");

const [tables] = await conn.query("SHOW TABLES");
console.log("Tables:", tables.map((t) => Object.values(t)[0]).join(", "));
await conn.end();
