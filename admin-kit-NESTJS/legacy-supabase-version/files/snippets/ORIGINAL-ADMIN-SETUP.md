# Admin dashboard (`/admin`): setup guide

The admin dashboard lives at **https://secure-house.co.uk/admin/**. It uses Supabase for
logins, the posts database and image storage. Blog and inspiration posts now come from
Supabase, not Sanity.

## 1. Create the Supabase project

1. Go to https://supabase.com, sign up, and click **New project**.
2. Name it `secure-house`, choose a strong database password (save it), and pick the
   **London (eu-west-2)** region.
3. Wait about 2 minutes for it to finish provisioning.

## 2. Create the tables, security rules and image bucket

1. In Supabase, open **SQL Editor → New query**.
2. Paste the whole of `supabase/schema.sql` and click **Run**. It should finish with
   "Success. No rows returned".
3. Check **Table Editor**: you should see `profiles`, `posts`, `post_redirects` and
   `login_attempts`. Check **Storage**: you should see a `blog-images` bucket.

## 3. Lock down sign-ups (important)

In **Authentication → Sign In / Providers**:

- Turn **OFF** "Allow new users to sign up". Only admins create logins, from `/admin/users`.
- Under **Email**, turn **ON** "Secure password change" and set the minimum password
  length to **12**.

Under **Authentication → URL Configuration**, set the **Site URL** to `https://secure-house.co.uk`.

## 4. Add the keys to the project

Open **Project Settings → API Keys** and copy these values into `.env.local` (for local
use) and into Netlify (Site configuration → Environment variables, scopes: all, deploy
contexts: all):

```
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...     (or the legacy "anon" key)
SUPABASE_SECRET_KEY=sb_secret_...               (or the legacy "service_role" key)
```

The secret key bypasses all security rules. Never commit it, never paste it in chat or
email, and never give it a `NEXT_PUBLIC_` prefix.

## 5. Create your admin login

```bash
npm install
node --env-file=.env.local scripts/create-admin.mts you@secure-house.co.uk "Your Name"
```

This prints a strong random password **once**. Save it in a password manager.

## 6. Move the existing posts out of Sanity

```bash
node --env-file=.env.local scripts/migrate-sanity-to-supabase.mts
```

It copies all 18 posts (2 blog, 16 inspiration) along with their images. It should end
with `Done: 18/18 posts migrated.` It is safe to run again.

## 7. Test locally

```bash
npm run dev
```

- Open http://localhost:3000/blog/ and a few `/inspiration/...` pages. They should look
  exactly as before.
- Open http://localhost:3000/admin/, log in, open a post, change something, click
  **Update**, and refresh the public page.

## 8. Deploy

Make sure the three env vars are set in Netlify (step 4) and the posts are migrated
(step 6) **before** pushing. Netlify builds on every push, and the pages are built from
Supabase, so the env vars must already exist **during the build**. Then commit and push.

Then check:

- https://secure-house.co.uk/admin/ redirects to the login page.
- After logging in, saving a post updates the live page straight away.

## Day-to-day use

| Task | Where |
| --- | --- |
| Write or edit a post | Blog posts / Inspiration → click the title |
| Change the URL slug | SEO box → Slug. The old URL automatically 301-redirects to the new one. |
| Meta title, description, focus keyphrase | SEO box → SEO tab (live Google preview and checks) |
| Canonical URL, meta keywords, noindex | SEO box → Advanced tab |
| Facebook/LinkedIn share text and image | SEO box → Social tab |
| Featured image | Right-hand column → Featured image (JPG/PNG/WebP/GIF/AVIF, max 4 MB) |
| Images inside the text | Editor toolbar → Image |
| Add or remove logins | Users (admins only) |
| Change your password | My account |

**Roles:** an *Admin* can do everything, including managing users. An *Editor* can manage
posts and images only.

## Security built in

- Every admin page and every save re-checks the login on the server. The redirect to the
  login page is only a convenience.
- Database Row-Level Security: the public site can only read *published* posts. Only
  staff can write, and only the server can create users or change roles.
- Login sessions use httpOnly, Secure cookies scoped to `/admin`, so page scripts can't
  read them.
- Brute-force protection: 5 failed logins per account or 20 per IP blocks further
  attempts for 15 minutes.
- The login form shows the same error for a wrong password and an unknown email, so it
  can't be used to discover accounts.
- Post HTML is sanitised on save and again on display, which blocks script injection.
- Uploaded images are checked by their actual file contents. SVG is not allowed.
- `/admin` is noindex, never cached, can't be framed, and loads no analytics, Clarity
  session recording or chat widget.

**Recommended:** turn on 2FA for your Supabase account, and keep the number of Admin users
small.
