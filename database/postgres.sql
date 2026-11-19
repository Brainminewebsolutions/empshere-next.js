-- =====================================================================
--  Admin dashboard - PostgreSQL schema (Supabase, Neon, Railway, RDS, local)
--
--  HOW TO RUN (Supabase):
--    Dashboard -> SQL Editor -> New query -> paste this whole file -> Run.
--  Any other Postgres: run it with psql or any SQL console.
--
--  Safe to run more than once: every statement uses IF NOT EXISTS.
--  It does NOT create a login. Create the first admin with
--  scripts/create-admin.mjs (see README step 5).
--
--  SECURITY (Supabase): tables in the "public" schema are reachable through
--  Supabase's public REST API with the anon key. The admin connects with a
--  direct Postgres connection instead, so we turn Row Level Security ON for
--  every table and add NO policies. That blocks the public API completely
--  while the server-side connection (which bypasses RLS) keeps working.
--  Do not add permissive policies to these tables.
-- =====================================================================

-- Staff logins. role: admin (everything) or editor (blog posts only).
-- Passwords are stored as scrypt hashes, never in plain text.
CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(36)  NOT NULL PRIMARY KEY,
  email         VARCHAR(190) NOT NULL UNIQUE,
  full_name     VARCHAR(100) NOT NULL DEFAULT '',
  role          VARCHAR(10)  NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  password_hash VARCHAR(255) NOT NULL,
  last_login_at TIMESTAMP    NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc')
);

-- Login sessions. The cookie holds a random token; only its SHA-256 hash
-- is stored here. Deleting a row logs that device out immediately.
CREATE TABLE IF NOT EXISTS sessions (
  id         VARCHAR(64)  NOT NULL PRIMARY KEY,
  user_id    VARCHAR(36)  NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  expires_at TIMESTAMP    NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
  ip         VARCHAR(64)  NOT NULL DEFAULT '',
  user_agent VARCHAR(255) NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_sessions_user    ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions (expires_at);

-- Login throttling (brute-force protection).
CREATE TABLE IF NOT EXISTS login_attempts (
  id         BIGSERIAL    PRIMARY KEY,
  email      VARCHAR(190) NOT NULL,
  ip         VARCHAR(64)  NOT NULL,
  succeeded  SMALLINT     NOT NULL DEFAULT 0,
  created_at TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc')
);
CREATE INDEX IF NOT EXISTS idx_attempts_email ON login_attempts (email, created_at);
CREATE INDEX IF NOT EXISTS idx_attempts_ip    ON login_attempts (ip, created_at);

-- Blog posts. faqs / custom_schemas hold JSON text.
CREATE TABLE IF NOT EXISTS posts (
  id                  VARCHAR(36)  NOT NULL PRIMARY KEY,
  post_type           VARCHAR(20)  NOT NULL DEFAULT 'blog',
  status              VARCHAR(10)  NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  title               VARCHAR(200) NOT NULL,
  slug                VARCHAR(190) NOT NULL,
  excerpt             VARCHAR(500) NOT NULL DEFAULT '',
  content_html        TEXT         NULL,
  author_name         VARCHAR(100) NOT NULL DEFAULT '',
  featured_image_url  VARCHAR(500) NULL,
  featured_image_alt  VARCHAR(300) NOT NULL DEFAULT '',
  featured_image_width  INTEGER NULL,
  featured_image_height INTEGER NULL,
  featured_image_srcset TEXT NULL,
  categories          TEXT         NULL,
  tags                TEXT         NULL,
  word_count          INTEGER      NOT NULL DEFAULT 0,
  published_at        TIMESTAMP    NULL,

  focus_keyphrase     VARCHAR(100) NOT NULL DEFAULT '',
  meta_title          VARCHAR(120) NOT NULL DEFAULT '',
  meta_description    VARCHAR(320) NOT NULL DEFAULT '',
  meta_keywords       VARCHAR(300) NOT NULL DEFAULT '',
  canonical_url       VARCHAR(500) NOT NULL DEFAULT '',
  noindex             SMALLINT     NOT NULL DEFAULT 0,
  og_title            VARCHAR(120) NOT NULL DEFAULT '',
  og_description      VARCHAR(320) NOT NULL DEFAULT '',
  og_image_url        VARCHAR(500) NULL,

  faqs                TEXT         NULL,
  auto_article_schema SMALLINT     NOT NULL DEFAULT 1,
  auto_faq_schema     SMALLINT     NOT NULL DEFAULT 1,
  custom_schemas      TEXT         NULL,

  created_at          TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
  updated_at          TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
  created_by          VARCHAR(36)  NULL,
  updated_by          VARCHAR(36)  NULL,
  CONSTRAINT uq_posts_type_slug UNIQUE (post_type, slug)
);
CREATE INDEX IF NOT EXISTS idx_posts_public  ON posts (status, published_at);
CREATE INDEX IF NOT EXISTS idx_posts_updated ON posts (updated_at);

-- Old slugs -> post. Written automatically when a published post's slug
-- changes, so the old URL redirects to the new one instead of 404ing.
CREATE TABLE IF NOT EXISTS post_redirects (
  id         BIGSERIAL    PRIMARY KEY,
  post_type  VARCHAR(20)  NOT NULL DEFAULT 'blog',
  old_slug   VARCHAR(190) NOT NULL,
  post_id    VARCHAR(36)  NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
  created_at TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
  CONSTRAINT uq_redirect_slug UNIQUE (post_type, old_slug)
);
CREATE INDEX IF NOT EXISTS idx_redirect_post ON post_redirects (post_id);

-- Uploaded images. Stored in the database (served from /media/<id>) so
-- they survive redeploys of the website.
CREATE TABLE IF NOT EXISTS media (
  id         BIGSERIAL   PRIMARY KEY,
  mime       VARCHAR(50) NOT NULL,
  size       INTEGER     NOT NULL,
  data       BYTEA       NOT NULL,
  created_by VARCHAR(36) NULL,
  created_at TIMESTAMP   NOT NULL DEFAULT (now() AT TIME ZONE 'utc')
);

-- Enquiries submitted through the website forms (Admin -> Leads).
CREATE TABLE IF NOT EXISTS leads (
  id         VARCHAR(36)   NOT NULL PRIMARY KEY,
  created_at TIMESTAMP     NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
  form_name  VARCHAR(100)  NOT NULL DEFAULT '',
  name       VARCHAR(150)  NOT NULL DEFAULT '',
  email      VARCHAR(190)  NOT NULL DEFAULT '',
  phone      VARCHAR(40)   NOT NULL DEFAULT '',
  message    VARCHAR(2000) NOT NULL DEFAULT '',
  page_title VARCHAR(200)  NOT NULL DEFAULT '',
  page_url   VARCHAR(500)  NOT NULL DEFAULT '',
  referrer   VARCHAR(500)  NOT NULL DEFAULT '',
  device     VARCHAR(255)  NOT NULL DEFAULT '',
  ip         VARCHAR(64)   NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at);

-- Job openings (Admin -> Job openings). Open jobs are listed on /careers.
CREATE TABLE IF NOT EXISTS jobs (
  id              VARCHAR(36)  NOT NULL PRIMARY KEY,
  title           VARCHAR(160) NOT NULL,
  department      VARCHAR(100) NOT NULL DEFAULT '',
  location        VARCHAR(160) NOT NULL DEFAULT '',
  employment_type VARCHAR(40)  NOT NULL DEFAULT 'Full-time',
  experience      VARCHAR(80)  NOT NULL DEFAULT '',
  salary          VARCHAR(100) NOT NULL DEFAULT '',
  summary         VARCHAR(400) NOT NULL DEFAULT '',
  description     TEXT         NULL,
  requirements    TEXT         NULL,
  status          VARCHAR(10)  NOT NULL DEFAULT 'open',
  created_at      TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
  updated_at      TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc')
);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status, created_at);

-- Applications from the /careers apply form (Admin -> Job applications).
CREATE TABLE IF NOT EXISTS job_applications (
  id              VARCHAR(36)  NOT NULL PRIMARY KEY,
  job_id          VARCHAR(36)  NULL,
  job_title       VARCHAR(160) NOT NULL DEFAULT '',
  name            VARCHAR(120) NOT NULL DEFAULT '',
  email           VARCHAR(190) NOT NULL DEFAULT '',
  phone           VARCHAR(40)  NOT NULL DEFAULT '',
  location        VARCHAR(120) NOT NULL DEFAULT '',
  experience      VARCHAR(40)  NOT NULL DEFAULT '',
  current_company VARCHAR(160) NOT NULL DEFAULT '',
  current_ctc     VARCHAR(60)  NOT NULL DEFAULT '',
  expected_ctc    VARCHAR(60)  NOT NULL DEFAULT '',
  notice_period   VARCHAR(60)  NOT NULL DEFAULT '',
  linkedin        VARCHAR(300) NOT NULL DEFAULT '',
  message         TEXT         NULL,
  resume_name     VARCHAR(160) NOT NULL DEFAULT '',
  resume_mime     VARCHAR(100) NOT NULL DEFAULT '',
  resume_size     INT          NOT NULL DEFAULT 0,
  resume_data     BYTEA        NULL,
  status          VARCHAR(20)  NOT NULL DEFAULT 'new',
  created_at      TIMESTAMP    NOT NULL DEFAULT (now() AT TIME ZONE 'utc')
);
CREATE INDEX IF NOT EXISTS idx_apps_created ON job_applications (created_at);

-- Lock the tables against Supabase's public REST API (see SECURITY above).
ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE media          ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads          ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
