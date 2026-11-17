# Admin Kit: portable admin dashboard for Next.js

Drop a ready-made `/admin` dashboard into any Next.js (App Router) website and
connect it to your own database.

**Using an AI agent (Claude, Antigravity, Cursor, Codex, ChatGPT...)?** Copy this
`admin-kit` folder into your project root and tell it:

> Read `admin-kit/AI-INSTALL-GUIDE.md` and install the admin dashboard in this
> project. Brand: "My Brand", domain: "mybrand.com", logo: "/logo.png".
> Database: Hostinger MySQL (or Supabase).

The agent does the code. You do the database steps below (they need your
passwords, so they should never be typed into a chat).

## What you get

- Login with roles (admin and editor), brute-force lockout, hashed passwords
- Blog manager: rich text editor, image upload, SEO panel with Google preview,
  FAQ and JSON-LD schema editor, automatic redirects when a slug changes,
  draft or published, preview
- User management (admin only), change password
- Leads inbox for website forms
- Safe by default: server-side checks on every page and action, httpOnly cookies,
  noindex, no-store, no framing, sanitised HTML

Works with **MySQL / MariaDB** (Hostinger, cPanel, any host) and **PostgreSQL**
(Supabase, Neon, Railway, RDS...).

---

## Connect your database, step by step

Pick your path:
[Hostinger MySQL](#a-hostinger-mysql) | [Supabase](#b-supabase) | [Other databases](#c-other-databases)

Every path has the same five steps: **create a database, get the connection
details, run the SQL file, set the environment variables, create the first admin.**

### A. Hostinger MySQL

#### Step 1. Create the database and user
1. hPanel, open your website, **Databases**, **Management**.
2. Under "Create a new MySQL database and database user" enter a database name,
   a user name and a strong password. Click **Create**.
3. Hostinger adds a prefix. Your real names look like `u123456789_blog` and
   `u123456789_admin`. **Use the full names with the prefix everywhere.**
4. Write down: database name, user name, the password you chose.

Use letters and digits in the password. Characters like `$ # " \` can get mangled
by environment-variable screens.

#### Step 2. Decide the host value
- Site runs **on Hostinger** (Node.js app on the same account): `DB_HOST=localhost`, `DB_PORT=3306`.
- Site runs **somewhere else** (Vercel, your own PC for testing): enable remote access.
  1. hPanel, **Databases**, **Remote MySQL**.
  2. Add the IP address of the machine that will connect (your PC's public IP,
     or "Any host" only while testing, then remove it).
  3. Pick your database, click **Create**.
  4. Use the hostname shown on that page (looks like `srv123.hstgr.io`) as `DB_HOST`.
     Vercel has no fixed IP, so for Vercel prefer Supabase or another Postgres
     host (path B), or a MySQL host that allows connections from anywhere.

#### Step 3. Run the SQL file (creates the tables)
1. hPanel, **Databases**, **phpMyAdmin**, click **Enter phpMyAdmin** next to your database.
2. In the left list click **your database** (the `u123456789_...` name).
3. Open the **SQL** tab.
4. Open `database/mysql.sql` from this kit in a text editor, copy **everything**,
   paste it into the SQL box, click **Go**.
5. Check the left list now shows these tables: `users`, `sessions`,
   `login_attempts`, `posts`, `post_redirects`, `media`, `leads`.

It is safe to run again. It never deletes data.

To check the connection from phpMyAdmin you can run:
```sql
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

#### Step 4. Set the environment variables (Node.js website)
These names are what the website reads. Use the full prefixed names from step 1.

| Name | Value |
| --- | --- |
| `DB_TYPE` | `mysql` |
| `DB_HOST` | `localhost` (or the remote hostname from step 2) |
| `DB_PORT` | `3306` |
| `DB_NAME` | `u123456789_blog` |
| `DB_USER` | `u123456789_admin` |
| `DB_PASSWORD` | the password from step 1 |

**On Hostinger:** hPanel, open your website, **Environment variables** (the page
with the **Add environment variable** and **Import .env** buttons). Add each row
above, or click **Import .env** and upload a `.env` file containing these lines.
Use the eye icon or **Show all values** to double-check every value. Then
**redeploy or restart** the Node.js app. The app reads the variables once when it
starts, so changes do nothing until it restarts.

**Locally:** copy `.env.example` to `.env.local` and fill the same names.

**Other hosts:** put the same names in the host's environment-variable screen:
Vercel (Project, Settings, Environment Variables, then redeploy), Netlify (Site
configuration, Environment variables), Render and Railway (the service's
Variables tab). Always restart or redeploy afterwards.

Optional: `DB_POOL_SIZE=5` (keep it small on shared hosting).

#### Step 5. Create the first admin
Option A, from your computer (needs remote access from step 2, or run it on the
server if you have a terminal):
```bash
node --env-file=.env.local scripts/create-admin.mjs you@yourdomain.com "Your Name"
```
It prints the login and a random password **once**. Save it.

Option B, no terminal (phpMyAdmin only):
1. On your computer run `node scripts/hash-password.mjs "YourStrongPassword1!"`. It prints a long line starting with `scrypt$`.
2. In phpMyAdmin, click the `users` table, **Insert**. Fill:
   `id` = any UUID (for example from uuidgenerator.net), `email` = `you@yourdomain.com`,
   `full_name` = your name, `role` = `admin`, `password_hash` = the `scrypt$...` line.
   Leave the other fields empty. Click **Go**.

Now open `https://yourdomain.com/admin/` and sign in. Change the password under
**My account**. Passwords need at least 12 characters and three of: lowercase,
uppercase, numbers, symbols.

---

### B. Supabase

Supabase is PostgreSQL. The kit connects with a normal Postgres connection (not
the Supabase JS client), using `DB_TYPE=postgres`.

#### Step 1. Create the project
1. supabase.com, **New project**. Choose a region near your visitors.
2. Set a **database password** and save it. This is the password used in the
   connection string. (You can reset it later in Project Settings, Database.)

#### Step 2. Get the connection string
1. In the project, click **Connect** (top of the dashboard).
2. Choose **Connection string** and the **URI** tab.
3. Pick the connection type:
   - **Transaction pooler** (port `6543`): best for Vercel, Netlify and other
     serverless hosts. Use this by default.
   - **Session pooler** (port `5432`): also fine, and good for long-running Node servers.
   - **Direct connection**: only works from IPv6 networks. Avoid unless you know you need it.
4. Copy it. It looks like
   `postgresql://postgres.abcdefgh:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`.
5. Replace `[YOUR-PASSWORD]` with your database password. If the password has
   special characters, URL-encode them (`@` becomes `%40`, `#` becomes `%23`).
   A letters-and-digits password avoids the issue.

(Menu names change over time. If you cannot find it, look for "Connect" or
Project Settings, Database, Connection string.)

#### Step 3. Run the SQL file
1. In the Supabase dashboard open **SQL Editor**, **New query**.
2. Open `database/postgres.sql` from this kit, copy everything, paste, click **Run**.
3. Expect "Success. No rows returned". In **Table Editor** you should see `users`,
   `sessions`, `login_attempts`, `posts`, `post_redirects`, `media`, `leads`.

The file turns **Row Level Security on with no policies** for every table. That
blocks Supabase's public REST API from reading your users table, while the
website's server-side connection keeps working. Do not add public policies to
these tables. Do not expose the database password in any `NEXT_PUBLIC_` variable.

#### Step 4. Environment variables
| Name | Value |
| --- | --- |
| `DB_TYPE` | `postgres` |
| `DATABASE_URL` | the full string from step 2, with your password filled in |

Optional: `DB_SSL=true` (default for remote hosts), `DB_POOL_SIZE=5`.

Where to put them: `.env.local` locally; on the host the same names in the
environment-variable screen (Vercel, Netlify, Render, Railway, or Hostinger's
**Environment variables** page as described in path A, step 4). Restart or
redeploy afterwards.

#### Step 5. Create the first admin
```bash
node --env-file=.env.local scripts/create-admin.mjs you@yourdomain.com "Your Name"
```
Save the password it prints. Then open `/admin/` and sign in.

Prefer no terminal? In **SQL Editor** run (after generating the hash with
`node scripts/hash-password.mjs "YourStrongPassword1!"`):
```sql
INSERT INTO users (id, email, full_name, role, password_hash, created_at)
VALUES (gen_random_uuid()::text, 'you@yourdomain.com', 'Your Name', 'admin',
        'PASTE-THE-scrypt$-LINE-HERE', (now() AT TIME ZONE 'utc'));
```

---

### C. Other databases

The kit supports **MySQL / MariaDB** and **PostgreSQL**. Any provider of those
works. The steps are always the same:

1. **Create** a database and a user with full rights on it.
2. **Find the connection details**: host, port, database name, user, password
   (or one connection string).
3. **Run the SQL file** in that provider's SQL console or with a client:
   - MySQL / MariaDB: `database/mysql.sql`
   - PostgreSQL: `database/postgres.sql`
4. **Set the environment variables** (see the table below and the host notes in path A, step 4).
5. **Create the first admin** with `scripts/create-admin.mjs`.

| Provider | Type | Notes |
| --- | --- | --- |
| Hostinger, cPanel hosts | mysql | Path A. Use `localhost` on the same host, Remote MySQL otherwise |
| Neon | postgres | Copy the connection string from the Neon dashboard into `DATABASE_URL` |
| Railway | postgres or mysql | Use the connection URL from the database's Variables or Connect tab |
| Render Postgres | postgres | Use the "External Database URL" from outside Render, "Internal" inside it |
| AWS RDS, Google Cloud SQL, Azure | either | Allow your host's IP in the security group or firewall, set `DB_SSL=true` |
| Other managed MySQL | mysql | Use the host, user and password they give you with `DB_SSL=true`. The SQL uses foreign keys, so the service must allow them |
| Local development | either | `DB_HOST=localhost`, `DB_SSL=false` |

Connection variables, all options:

```
# MySQL, separate values
DB_TYPE=mysql
DB_HOST=...
DB_PORT=3306
DB_NAME=...
DB_USER=...
DB_PASSWORD=...

# PostgreSQL, separate values
DB_TYPE=postgres
DB_HOST=...
DB_PORT=5432
DB_NAME=...
DB_USER=...
DB_PASSWORD=...

# Either database, one string (overrides the values above)
DATABASE_URL=mysql://user:pass@host:3306/dbname
DATABASE_URL=postgresql://user:pass@host:5432/dbname

DB_SSL=true        # optional, force SSL on or off
DB_POOL_SIZE=5     # optional
```

If `DB_TYPE` is missing, `DATABASE_URL` starting with `postgres://` or
`postgresql://` selects Postgres, otherwise MySQL is used.

---

## If login shows an error

| Message on the login page | What to do |
| --- | --- |
| The database rejected the username or password | `DB_USER` or `DB_PASSWORD` is wrong, or that user is not attached to that database. On Hostinger check the `u123456789_` prefixes and reset the password in hPanel. Fix the env var and restart the app |
| Cannot reach the database | Wrong host or port, or remote access is not enabled for your IP |
| Database not found | Wrong `DB_NAME` (include the prefix) |
| Database tables are missing | You did not run the SQL file on that database (step 3) |
| SSL problem | Set `DB_SSL=true` (remote) or `false` (local) |

If the login form itself says the username or password is wrong, the database is
fine and you are using the wrong admin login. Re-run `create-admin.mjs` with the
same email to reset that password.

## Contents of this folder

| Path | What it is |
| --- | --- |
| `AI-INSTALL-GUIDE.md` | Instructions for AI agents (and humans) to install everything |
| `install.mjs` | Copies and rebrands the files into your project |
| `files/` | The dashboard source: routes, server actions, lib, SQL files, scripts |
| `files/database/` | `mysql.sql` and `postgres.sql` |
| `files/scripts/` | `create-admin.mjs` and `hash-password.mjs` |
| `files/reference/` | Example public blog pages to adapt |
| `legacy-supabase-version/` | The older version that used Supabase Auth. Not needed |

Quick install without an AI:

```bash
node admin-kit/install.mjs --target . --name "My Brand" --domain mybrand.com --logo /logo.png
```
then follow section 3 and 5 of `AI-INSTALL-GUIDE.md`.
