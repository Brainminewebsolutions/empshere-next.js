# Admin Kit install guide (for Claude Code, Codex, Cursor or a human)

Goal: add the `/admin` dashboard (login, users, blog posts, SEO tools, leads) to a
different Next.js App Router project, backed by that project's own Supabase.

## 0. Paste-this prompt for your AI agent

Copy the kit folder (`admin-kit/`) into the new project root, open the agent there
and send:

> Read `admin-kit/AI-INSTALL-GUIDE.md` fully, then install the admin dashboard into
> this project. Brand name: "<NAME>", domain: "<DOMAIN>", logo: "<PUBLIC PATH>".
> Follow section 4 in order and run every verification in section 5. Before editing
> any existing file (next.config, layout, proxy.ts), read it and merge, never
> overwrite. Check this project's Next.js version and read the matching docs in
> `node_modules/next/dist/docs/` before writing code. Ask me for the Supabase keys
> instead of inventing them. Report what you changed and what I must do by hand.

Agent rules (also for humans):
1. Read each existing file before changing it. Merge, never replace.
2. Do not guess APIs or versions. The kit targets Next.js 16 (App Router, `proxy.ts`
   instead of `middleware.ts`, React 19, `cookies()` async). If the target is older
   (Next 14/15), see section 6.
3. Never put Supabase keys in code, chat or any `NEXT_PUBLIC_` variable.
4. Do not run the SQL or create users without telling the user what it does.

## 1. Prerequisites

- Next.js App Router project using TypeScript, `@/*` path alias mapped to the project
  root (`"paths": {"@/*": ["./*"]}`). If the project uses `src/`, see section 6.
- Node 20+.
- A Supabase project (free tier is fine). Region close to your users.

## 2. What the kit expects from the host project

- Routes under `app/admin/**` (the kit owns this whole subtree).
- Root `proxy.ts` (Next 16) guarding `/admin`.
- `lib/` helpers imported through `@/lib/...`.
- An image at the `--logo` public path (white logo on dark sidebar works best).
- A public blog that reads the `posts` table (optional but the point of the editor).
  Examples are in `files/reference/`.

## 3. Quick path: run the installer

From the kit's source repo (or from `admin-kit/` already copied into the target):

```bash
node admin-kit/install.mjs --target <project dir> --name "Brand" --domain brand.com --logo /brand-logo-white.png
```

Flags: `--no-leads` (skip leads inbox), `--no-reference` (skip example public
blog files), `--force` (overwrite existing files), `--dry-run` (list only).
It rebrands "Secure House", the domain and logo path inside the copied files.
Existing files are skipped and reported: merge those by hand (usually `proxy.ts`
and `supabase/schema.sql`).

## 4. Manual steps after copying (do in order)

### 4.1 Install dependencies
```bash
npm i @supabase/ssr @supabase/supabase-js @tiptap/react @tiptap/pm @tiptap/starter-kit \
  @tiptap/extension-image @tiptap/extension-text-style sanitize-html server-only
npm i -D @types/sanitize-html
```
Use the versions already tested in the kit's source project if the install resolves
something incompatible: `@supabase/ssr ^0.12`, `@supabase/supabase-js ^2.118`,
`@tiptap/* ^3.32`, `sanitize-html ^2.18`.

### 4.2 `next.config.ts` (merge)
Image uploads are Server Actions capped at 4 MB in code, so raise the body limit:
```ts
experimental: { serverActions: { bodySizeLimit: "5mb" } },
```
Add admin response headers (put them after any site-wide header rule):
```ts
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
```
If the project sets `trailingSlash: true` (the kit's links assume `/admin/` with a
trailing slash and work either way). If the project has a Content-Security-Policy,
make sure `img-src` allows your Supabase storage host (`https://<ref>.supabase.co`).

### 4.3 Keep the public layout off `/admin`
The admin has its own `app/admin/layout.tsx`, but the root layout still wraps it. If
the root layout renders a public header, footer, chat widget or analytics, wrap
those (not `{children}`) in `components/SiteOnly.tsx`:
```tsx
import SiteOnly from "@/components/SiteOnly";
// <SiteOnly><Header /></SiteOnly> {children} <SiteOnly><Footer /><Analytics /></SiteOnly>
```
Never load session-recording tools (Clarity, Hotjar) on `/admin`.

### 4.4 `proxy.ts`
If the target has none, the installer's copy is correct. If it has one, merge:
run the Supabase session refresh only for `/admin` and keep the existing logic for
other paths. Keep `export const config = { matcher: ["/admin", "/admin/:path*"] }`
or add those matchers to the existing one. On Next 15 or older, rename to
`middleware.ts` and export `middleware` (see section 6).

### 4.5 Environment variables
Add to `.env.local` and to the hosting provider (Vercel/Netlify, all environments).
All server-only, no `NEXT_PUBLIC_` prefix:
```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...   # or legacy anon key
SUPABASE_SECRET_KEY=sb_secret_...             # or legacy service_role key. Never expose.
```
Supabase: Project Settings, API Keys.

### 4.6 Supabase database
1. SQL Editor, new query, paste `supabase/schema.sql`, Run. Expect "Success".
   Creates `profiles`, `posts`, `post_redirects`, `login_attempts`, `leads`, RLS
   policies, grants and the `blog-images` bucket. If you skipped leads, you can
   leave the table, it is harmless.
2. Authentication, Sign In / Providers: turn OFF "Allow new users to sign up". Email:
   turn ON "Secure password change", minimum length 12.
3. Authentication, URL Configuration: Site URL = your production domain.

### 4.7 Create the first admin
```bash
node --env-file=.env.local scripts/create-admin.mts you@brand.com "Your Name"
```
It prints a random password once. Save it. More users are added at `/admin/users/`.
Note: `app/admin/_actions/validation.ts` maps usernames to `<username>@<domain>`
(`USERNAME_DOMAIN`). The installer set it to your `--domain`.

### 4.8 Public blog (so published posts show up)
The admin writes to the `posts` table; the public site must read it. See
`admin-kit-reference/` (copied from the source site):
- `app/blog/...` listing, pagination and post page using `lib/posts.ts` helpers
  (`getPublishedPost`, `getPublishedPostsPage`, `getPublishedSlugs`,
  `getRedirectTarget`), and `components/BlogPostTemplate.tsx` for the body.
- `post-metadata.ts`, `seo.ts`: metadata builders. `seo.ts` has site-specific
  default OG image, replace it.
- `post-sitemap-route.ts`: sitemap of posts.
- `enquiry-leads-db.ts`: shows how a contact form inserts into `leads` using
  `createSecretClient()`. Wire your own form to it if you want the Leads inbox.
After saving, `app/admin/_actions/posts.ts` calls `revalidatePath` for `/blog`,
`/blog/page/[page]`, post URLs and sitemaps. Adjust those paths if your blog lives
elsewhere.

## 5. Customisation points and verification

Customise (search the target project for these):
| What | Where |
| --- | --- |
| Brand name, domain, logo | already replaced by installer; check `SidebarShell.tsx`, `login/page.tsx`, `layout.tsx`, `lib/schema.ts`, `lib/posts.ts` (`SITE_URL`) |
| Organization JSON-LD (name, email, brand) | `lib/schema.ts` |
| Colours, fonts, spacing | `app/admin/admin.module.css` (CSS variables at the top) |
| Post types (`blog`, `inspiration`) | `lib/posts.ts` (`PostType`, `POST_TYPES`), `app/admin/(panel)/posts/new/page.tsx`, `lib/schema.ts` breadcrumb. For a single type, set both to `["blog"]` |
| URL shape `/{type}/{slug}/` | `postPath()` in `lib/posts.ts` |
| Nav items | `app/admin/(panel)/NavLinks.tsx` |
| Roles | `lib/auth.ts` (`requireStaff`, `requireAdmin`) and `profiles.role` in SQL |
| Upload limit/types | `app/admin/_actions/posts.ts` |

Verify before reporting done:
1. `npx tsc --noEmit` passes.
2. `npm run lint` passes (or no new errors).
3. `npm run dev`; open `/admin/`: redirects to `/admin/login/`.
4. Log in with the admin created in 4.7; dashboard loads; sidebar shows the brand.
5. Create a post with a featured image, set Published, open the public URL. It
   renders. Change the slug; the old URL 301-redirects.
6. `/admin/*` response has `X-Robots-Tag: noindex` and no analytics scripts load
   (check with DevTools, or `curl -I http://localhost:3000/admin/login/`).
7. A logged-out request to a server action or `/admin/users/` redirects to login.
8. `npm run build` succeeds with the env vars present.

## 6. Other project shapes

- **`src/` directory**: copy `files/app` to `src/app`, `files/lib` to `src/lib`,
  `files/components` to `src/components`. `@/*` must map to `./src/*`. Keep
  `proxy.ts` next to `app/` inside `src/` (Next requires it at that level). Keep
  `supabase/`, `scripts/` at the project root.
- **Next 14/15**: rename `proxy.ts` to `middleware.ts` and `export async function middleware`.
  `cookies()` and `headers()` are sync in 14; remove the `await` in
  `lib/supabase/server.ts`. Check `params`/`searchParams` in page files: in 15+
  they are Promises (the kit awaits them, remove `await` for 14).
- **Different auth/DB**: the kit is Supabase-specific (auth, RLS, storage). Replacing
  it means rewriting `lib/supabase/*`, `lib/auth.ts`, `_actions/*` and
  `schema.sql`. Prefer keeping Supabase.
- **Not Tailwind-dependent**: styling is one CSS module, no Tailwind or UI library
  needed.
- **Hosting**: works on Vercel and Netlify. Env vars must exist at build time if
  the public blog is statically generated from Supabase.

## 7. Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| 503 "Admin is not configured" | Env vars missing in the running environment; restart dev server |
| Login loop between `/admin` and `/admin/login` | Supabase user has no `profiles` row. Create via `create-admin.mts` or Users page |
| "Cannot find module '@/lib/...'" | `@/*` alias not mapped to project root (or `src/`) |
| Upload fails / 413 | `serverActions.bodySizeLimit` not set (4.2) |
| Images blocked | CSP `img-src` missing the Supabase host |
| Posts save but public page is stale | Public routes not calling the same `revalidatePath`; check 4.8 |
| `column ... does not exist` | `schema.sql` not fully run; re-run it (it is idempotent) |
| Build fails on `server-only` | Imported a `lib/` server file into a client component |

## 8. Keeping copies in sync

The kit is a snapshot. When you improve the admin in the source project, re-copy:
`node admin-kit/install.mjs --target <proj> ... --force` overwrites kit files, so
commit or stash local edits in the target first and review the diff.
