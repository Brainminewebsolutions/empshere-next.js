# AI Install Guide: add the admin dashboard to a Next.js project

This file is written for an AI coding agent (Claude Code, Antigravity, Cursor,
Codex, Copilot, ChatGPT with file access, or similar). Read all of it, then
install the admin dashboard into the user's project by following the steps in
order. A human can follow it too.

What you are installing: a `/admin` area with login, user management (admin and
editor roles), a blog post manager (rich text editor, image upload, SEO panel,
FAQ and JSON-LD schema editor, automatic 301 redirects for renamed slugs,
draft or published, preview), a leads inbox for website forms, and a change
password page. It stores everything in the project's own database: MySQL or
MariaDB (Hostinger, cPanel) or PostgreSQL (Supabase, Neon, Railway and others).

## 0. The prompt the user pastes to you

The user copies the `admin-kit/` folder into the root of their Next.js project,
opens you in that project and sends something like:

> Read `admin-kit/AI-INSTALL-GUIDE.md` fully and install the admin dashboard in
> this project. Brand: "<NAME>", domain: "<DOMAIN>", logo: "<PUBLIC PATH or none>".
> Database: <Hostinger MySQL | Supabase | other>.

If the user left something out, ask only for what you cannot detect:
1. Brand name, domain (and `https://www.` site URL if different), logo path.
2. Which database: Hostinger MySQL, Supabase, or another MySQL or Postgres.
3. Where the site is hosted (Hostinger Node.js, Vercel, other), only to tell them where to put env vars.

Never ask the user to paste a database password into chat. Tell them to put it
in `.env.local` and in the host's environment-variable screen themselves.

## 1. Rules for the agent

1. Read before you write. Open each existing file you will change (next.config,
   app/layout, proxy.ts, package.json, tsconfig). Merge, never overwrite.
2. Do not guess APIs, versions, flags or package names. Check the project's
   Next.js version in `package.json`. If the project has an `AGENTS.md` or
   `node_modules/next/dist/docs/`, read the relevant part before writing code.
3. The kit targets Next.js 16 with the App Router, React 19, `proxy.ts` (not
   `middleware.ts`), async `cookies()`, and `cacheComponents: true`. If the
   project is older, read section 7 first and tell the user what changes.
4. Never put credentials in code, commits, chat, or any `NEXT_PUBLIC_` variable.
5. Do not print the generated admin password anywhere except once to the user.
6. Do not run SQL against the user's database yourself unless they gave you
   access and asked you to. Normally the user runs the SQL file (README step 3).
7. Run every check in section 5 and report real results. If something failed or
   you skipped it, say so.
8. If you cannot run commands (chat-only AI), switch to section 8.

## 2. What is in the kit

```
admin-kit/
  AI-INSTALL-GUIDE.md      this file
  README.md                human guide: connect the database step by step
  install.mjs              copies and rebrands the files (section 3)
  files/
    app/admin/             the dashboard (routes, server actions, CSS)
    app/api/enquiry/       POST endpoint that stores website form submissions as leads
    app/media/[id]/        serves uploaded images from the database
    lib/                   db.ts (MySQL + Postgres), auth, password, posts, sanitize, schema, seo-analysis, slug
    components/            SiteOnly (hide site header/footer on /admin), PostPreview
    proxy.ts               guards /admin (redirects to login when no session cookie)
    database/mysql.sql     tables for MySQL / MariaDB
    database/postgres.sql  tables for PostgreSQL / Supabase
    scripts/create-admin.mjs   creates the first admin login (both databases)
    scripts/hash-password.mjs  prints a password hash (manual reset in phpMyAdmin)
    snippets/env.example.txt   environment variable template
    reference/             example PUBLIC blog pages. Adapt, do not copy blindly.
  legacy-supabase-version/ old Supabase-Auth kit. Ignore unless the user asks for it.
```

How the database layer works: all SQL goes through `lib/db.ts` with `?`
placeholders. `DB_TYPE=mysql` (default) uses `mysql2`. `DB_TYPE=postgres` uses
`pg` and `lib/db.ts` rewrites placeholders and a few MySQL-isms automatically.
So the same admin code runs on both. You do not need to edit SQL in the app.

## 3. Install

### 3.1 Copy files (use the installer)

From the project root:

```bash
node admin-kit/install.mjs --target . --name "BRAND" --domain example.com --logo /logo.png
```

Flags: `--site-url https://www.example.com` (public URL used in schema and
permalinks, default `https://<domain>`), `--logo <public path>` (omit to get a
text placeholder `public/admin-logo.svg`), `--no-leads`, `--no-reference`,
`--force` (overwrite), `--dry-run` (list only).

It rebrands names, domain and logo inside the copied files, copies
`.env.example` if none exists, and prints the dependency command and the manual
steps. Existing files are skipped and listed. For skipped files, open both
versions and merge by hand. `proxy.ts` is the usual one.

If the project uses a `src/` folder, see section 7 before running it.

### 3.2 Install dependencies

Run the exact commands the installer printed. For reference the full set is:

```bash
npm i mysql2 pg @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-image \
  @tiptap/extension-text-style sanitize-html server-only
npm i -D @types/pg @types/sanitize-html
```

Both `mysql2` and `pg` are installed on purpose: the driver is picked at runtime
by `DB_TYPE`, and the code imports both. Use the project's package manager
(pnpm, yarn, bun) if it does not use npm. If an install conflicts with the
project's React or Next version, report it. Do not force.

### 3.3 `next.config.ts` (merge into the existing config)

```ts
const nextConfig: NextConfig = {
  // keep existing options, add these:
  experimental: {
    // Image uploads are server actions capped at 4 MB in code.
    serverActions: { bodySizeLimit: "5mb" },
  },
  cacheComponents: true, // required: lib/posts.ts uses "use cache", cacheTag, cacheLife
  serverExternalPackages: ["mysql2", "pg", "sanitize-html"],
  async headers() {
    return [
      // ...existing rules
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};
```

If `experimental`, `headers` or `serverExternalPackages` already exist, add to
them. If the project has a Content-Security-Policy, make sure it allows the
`/media/*` images (same origin) and inline styles used by the editor.

Turning on `cacheComponents` changes how all pages are rendered. Before enabling
it on an existing site, read the Next.js "Cache Components" doc for the installed
version and tell the user what to watch for (dynamic data such as `cookies()`,
`headers()` or `Date.now()` in pages must sit inside `<Suspense>` or a
`"use cache"` function). Run the build in section 5 to find any page that breaks.
If it breaks pages you cannot fix safely, stop and report to the user.

### 3.4 Keep the public header and footer off `/admin`

The admin has its own layout, but the root layout still wraps it. Wrap the public
header, footer, chat widgets and analytics (not `{children}`) in `SiteOnly`:

```tsx
import SiteOnly from "@/components/SiteOnly";
// <SiteOnly><Header /></SiteOnly> {children} <SiteOnly><Footer /></SiteOnly>
```

Never load session-recording tools (Clarity, Hotjar) on `/admin`.

### 3.5 `proxy.ts`

If the project has no `proxy.ts` or `middleware.ts`, the installed one is
correct. If it has one, merge: run the admin check only for `/admin` and keep the
existing logic. Keep `matcher: ["/admin", "/admin/:path*"]` or add those
matchers. The cookie name `ws_admin_session` appears in `proxy.ts` and in
`lib/auth.ts` (`SESSION_COOKIE`); if you rename it, change both.

### 3.6 Environment variables

Create `.env.local` (and tell the user to set the same names on the host).
Template: `snippets/env.example.txt`, also copied to `.env.example`. Make sure
`.env*` is in `.gitignore`.

MySQL / Hostinger:
```
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
```
Postgres / Supabase:
```
DB_TYPE=postgres
DATABASE_URL=postgresql://...
```
Leave the values for the user to fill. Do not invent them. The user gets them by
following `README.md` steps 1 and 2 (Hostinger) or the Supabase section.

### 3.7 Create the tables

The user runs the SQL file for their database (README step 3):
`files/database/mysql.sql` (copied to `database/mysql.sql`) or
`database/postgres.sql`. It is safe to run twice.

### 3.8 Create the first admin

After the env vars are set and the tables exist:

```bash
node --env-file=.env.local scripts/create-admin.mjs you@yourdomain.com "Your Name"
```

It prints a random password once. Pass your own as a third argument if the user
prefers. Re-running with the same email resets that password. On hosting where
you cannot run Node commands, use `scripts/hash-password.mjs` and insert the row
by hand (README step 5, option B).

Plain usernames also work at the login form: `admin` is treated as
`admin@<domain>` using `USERNAME_DOMAIN` in `app/admin/_actions/validation.ts`
(the installer set it to the `--domain`). The stored email must match.

### 3.9 Public blog (so published posts appear on the site)

The admin writes to the `posts` table. The public site must read it. Examples
are in `admin-kit-reference/` (the `slug` folder is the `[slug]` route):
- `app/blogs/page.tsx`, `app/blogs/slug/page.tsx`, `not-found.tsx`: listing and post page
- `app/api/posts/route.ts`: JSON feed for "load more"
- `app/components/BlogGrid.tsx`, `BlogArticle.tsx`: markup that uses the original
  site's CSS classes. Restyle with the host project's design.

Use the helpers in `lib/posts.ts`: `getPublishedPostsPage`, `getPublishedPost`,
`getPublishedSlugs`, `getRedirectTarget`, and `buildPostMetadata` from
`lib/post-metadata.ts`. After saving a post, the admin calls `updateTag` and
`revalidatePath("/blogs")` and `revalidatePath("/")` (`refreshPublicSite` in
`app/admin/_actions/posts.ts`). If the host's blog lives at another path, change
those paths. Posts are served at `/blogs/<slug>` (`postPath()` in `lib/posts.ts`).

To receive website form submissions as leads, POST JSON
`{ name, email, phone, message, form_name, page_title, page_url }` to
`/api/enquiry`. Fields are clipped and an IP flood guard is built in.

## 4. Customisation points

| What | Where |
| --- | --- |
| Brand name, domain, logo | already replaced by the installer. Check `SidebarShell.tsx`, `(panel)/layout.tsx`, `login/page.tsx`, `app/admin/layout.tsx` (title), `lib/schema.ts` (Organization JSON-LD), `lib/posts.ts` (`SITE_URL`) |
| Logo file path | `LOGO_SRC` in `app/admin/(panel)/SidebarShell.tsx` and the `<img>` in `app/admin/login/page.tsx` |
| Colours and spacing | CSS variables at the top of `app/admin/admin.module.css` |
| Nav items | `app/admin/(panel)/NavLinks.tsx` |
| Roles | `lib/auth.ts` (`requireStaff`, `requireAdmin`) and `users.role` |
| Upload limit and types | `app/admin/_actions/posts.ts` (`MAX_IMAGE_BYTES`, `sniffImage`) |
| Password rules | `app/admin/_actions/validation.ts` |

## 5. Verify before reporting done

Run these and report the real output:

1. `npx tsc --noEmit` has no errors in the kit files.
2. `npm run lint` has no new errors (the kit folder `admin-kit/` itself should be
   excluded from tsconfig and eslint so it never affects the build: add
   `"admin-kit"` to tsconfig `exclude` and `"admin-kit/**"` to the eslint ignores).
3. `npm run build` succeeds. Env vars are not needed for the build.
4. With env vars set and tables created: `npm run dev`, open `/admin/`. It must
   redirect to `/admin/login/`.
5. Log in with the admin from step 3.8. The dashboard loads and the sidebar shows
   the brand.
6. Create a post with a featured image, set it to Published, open the public URL.
   Rename the slug: the old URL must 301 to the new one.
7. `curl -I http://localhost:3000/admin/login/` shows `X-Robots-Tag: noindex` and
   no analytics script loads on `/admin`.
8. A logged-out request to `/admin/users/` redirects to login.

If you cannot reach a database, do steps 1 to 3 and 8, then say clearly that
steps 4 to 7 were not run and why.

## 6. Troubleshooting

| Symptom (shown on the login page or in logs) | Cause and fix |
| --- | --- |
| "The database rejected the username or password" | The server's `DB_USER` or `DB_PASSWORD` (or the password inside `DATABASE_URL`) is wrong, or the user is not attached to that database. Hostinger names have a `u123456789_` prefix on both database and user. Reset the password in hPanel, update the env var, restart the app |
| "Cannot reach the database" | Wrong `DB_HOST` or port. On Hostinger use `localhost` when the site runs there. From your PC or another host use the Remote MySQL hostname and add the IP in hPanel. Supabase: use the pooler connection string from Project, Connect |
| "Database not found" | Wrong `DB_NAME` (include the prefix) or wrong database in `DATABASE_URL` |
| "Database tables are missing" | The SQL file was not run on that database. Run `database/mysql.sql` or `database/postgres.sql` |
| "SSL problem" | Set `DB_SSL=true` for remote Postgres/MySQL, `DB_SSL=false` for a local one |
| "Missing environment variable DB_NAME" | Variables are not set in the running environment. Local: `.env.local`. Host: the environment-variable screen, then restart or redeploy |
| Env var changed but nothing happens | The connection pool is created once per process. Restart or redeploy the Node app |
| Login works then bounces back to login | Cookie is `secure` in production, so the site must be on HTTPS. Check the domain serves HTTPS |
| Upload fails or 413 | `serverActions.bodySizeLimit` not set (3.3) |
| Build error about `Date.now()` / `cookies()` / "uncached data" | `cacheComponents` is stricter. Wrap the dynamic part in `<Suspense>` or use `"use cache"` |
| `Cannot find module '@/lib/...'` | `@/*` path alias is not mapped to the project root (or `src/`) |
| Build fails on `server-only` | A server file in `lib/` was imported into a client component |
| Posts save but the public page is stale | The public routes are not using the kit's cached helpers, or the revalidate paths do not match (3.9) |

## 7. Other project shapes

- `src/` folder: copy `app`, `lib`, `components` and `proxy.ts` into `src/` (run
  `install.mjs` with `--target` pointing at a temp folder, then move the pieces),
  keep `database/` and `scripts/` at the project root, and make sure
  `"@/*": ["./src/*"]` in tsconfig.
- Next.js 14 or 15: rename `proxy.ts` to `middleware.ts` and export
  `middleware` instead of `proxy`. `cookies()` is sync in 14 (remove the `await`
  in `lib/auth.ts`). `params` and `searchParams` are Promises in 15 and later
  (the kit awaits them; remove for 14). `updateTag`, `cacheTag`, `cacheLife` and
  `cacheComponents` need Next 16: on older versions replace `"use cache"` helpers
  in `lib/posts.ts` with plain queries (or `unstable_cache`), and `updateTag`
  with `revalidateTag`. Tell the user this is an adaptation, then re-run the checks.
- Pages Router project: not supported. The kit needs the App Router.
- Another database (MSSQL, SQLite, Mongo): not supported out of the box. The only
  file to adapt is `lib/db.ts` plus a new SQL file. Tell the user rather than guessing.

## 8. If you cannot run commands or edit files (chat-only AI)

1. Ask the user to run the installer, or tell them the exact command from 3.1.
2. Ask them to paste: `package.json`, `next.config.*`, `app/layout.tsx`, and
   `proxy.ts` or `middleware.ts` if present, plus the Next.js version.
3. Return the exact merged contents for `next.config`, `app/layout.tsx` and
   `proxy.ts`, and the exact `npm i` commands.
4. Walk them through `README.md` steps 1 to 5 for their database.
5. Give them the checks in section 5 to run and ask for the output.

## 9. Keeping the kit in sync

The kit is a snapshot of the source project's admin. When the source improves,
re-run `install.mjs --force` into the target after committing local edits, then
review the diff.
