# Admin Kit (portable admin dashboard)

A self-contained copy of the Secure House `/admin` dashboard so it can be dropped
into any other Next.js (App Router) project. This folder is excluded from this
project's TypeScript and ESLint runs, so it never affects the Secure House build.

## What you get

- Supabase email/password login, roles (admin / editor), brute-force lockout
- Blog post manager: rich text (TipTap) editor, image upload, SEO panel with live
  Google preview, FAQ + JSON-LD schema editor, slugs with automatic 301 redirects,
  draft/published, preview page
- User management (admin only), change password
- Leads inbox (optional, remove with `--no-leads`)
- Hardened by default: server-side auth checks, RLS, httpOnly cookies scoped to
  `/admin`, noindex, no-store, no framing, sanitised HTML

## Contents

| Path | What it is |
| --- | --- |
| `AI-INSTALL-GUIDE.md` | Step-by-step guide for an AI agent (or a human). Start here. |
| `install.mjs` | One command that copies and rebrands everything |
| `files/app/admin/` | The dashboard routes, server actions and CSS |
| `files/lib/` | Auth, Supabase clients, posts queries, sanitiser, slug, schema, SEO analysis |
| `files/components/` | `BlogPostTemplate` (used by the preview page), `SiteOnly` |
| `files/proxy.ts` | Next 16 proxy that refreshes the session and guards `/admin` |
| `files/supabase/schema.sql` | Tables, RLS, storage bucket |
| `files/scripts/create-admin.mts` | Creates the first admin login |
| `files/reference/` | Example public blog pages, sitemap route, leads writer. Copied to `admin-kit-reference/` in the target; adapt, do not use blindly |
| `files/snippets/` | Env example and the original setup doc |

## 60-second version

```bash
# from this repo
node admin-kit/install.mjs --target "../my-new-site" --name "My Brand" --domain mybrand.com --logo /my-logo-white.png
```

Then open `AI-INSTALL-GUIDE.md` section 4 in the target project, or tell your AI
agent: "Read admin-kit/AI-INSTALL-GUIDE.md and finish the install."
