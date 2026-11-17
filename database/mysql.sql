-- =====================================================================
--  Admin dashboard - MySQL / MariaDB schema
--
--  HOW TO RUN (Hostinger):
--    hPanel -> Databases -> phpMyAdmin -> click your database in the left
--    list -> "SQL" tab -> paste this whole file -> Go.
--  Any other MySQL/MariaDB: run it with the mysql client or any SQL console.
--
--  Safe to run more than once: every table uses IF NOT EXISTS.
--  It does NOT create a login. Create the first admin with
--  scripts/create-admin.mjs (see README step 5).
-- =====================================================================

SET NAMES utf8mb4;

-- ---------------------------------------------------------------------
-- Staff logins. role: admin (everything) or editor (blog posts only).
-- Passwords are stored as scrypt hashes, never in plain text.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id`            CHAR(36)      NOT NULL,
  `email`         VARCHAR(190)  NOT NULL,
  `full_name`     VARCHAR(100)  NOT NULL DEFAULT '',
  `role`          ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  `password_hash` VARCHAR(255)  NOT NULL,
  `last_login_at` DATETIME      NULL,
  `created_at`    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Login sessions. The cookie holds a random token; only its SHA-256 hash
-- is stored here. Deleting a row logs that device out immediately.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sessions` (
  `id`         CHAR(64)     NOT NULL,
  `user_id`    CHAR(36)     NOT NULL,
  `expires_at` DATETIME     NOT NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip`         VARCHAR(64)  NOT NULL DEFAULT '',
  `user_agent` VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `idx_sessions_user` (`user_id`),
  KEY `idx_sessions_expires` (`expires_at`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Login throttling (brute-force protection).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email`      VARCHAR(190)    NOT NULL,
  `ip`         VARCHAR(64)     NOT NULL,
  `succeeded`  TINYINT(1)      NOT NULL DEFAULT 0,
  `created_at` DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_attempts_email` (`email`, `created_at`),
  KEY `idx_attempts_ip` (`ip`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Blog posts (shown on /blogs and /blogs/<slug>).
-- faqs / custom_schemas hold JSON text.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `posts` (
  `id`                  CHAR(36)     NOT NULL,
  `post_type`           VARCHAR(20)  NOT NULL DEFAULT 'blog',
  `status`              ENUM('draft','published') NOT NULL DEFAULT 'draft',
  `title`               VARCHAR(200) NOT NULL,
  `slug`                VARCHAR(190) NOT NULL,
  `excerpt`             VARCHAR(500) NOT NULL DEFAULT '',
  `content_html`        LONGTEXT     NULL,
  `author_name`         VARCHAR(100) NOT NULL DEFAULT '',
  `featured_image_url`  VARCHAR(500) NULL,
  `featured_image_alt`  VARCHAR(300) NOT NULL DEFAULT '',
  `featured_image_width`  INT NULL,
  `featured_image_height` INT NULL,
  `featured_image_srcset` TEXT NULL,
  `categories`          LONGTEXT     NULL,
  `tags`                LONGTEXT     NULL,
  `word_count`          INT          NOT NULL DEFAULT 0,
  `published_at`        DATETIME     NULL,

  `focus_keyphrase`     VARCHAR(100) NOT NULL DEFAULT '',
  `meta_title`          VARCHAR(120) NOT NULL DEFAULT '',
  `meta_description`    VARCHAR(320) NOT NULL DEFAULT '',
  `meta_keywords`       VARCHAR(300) NOT NULL DEFAULT '',
  `canonical_url`       VARCHAR(500) NOT NULL DEFAULT '',
  `noindex`             TINYINT(1)   NOT NULL DEFAULT 0,
  `og_title`            VARCHAR(120) NOT NULL DEFAULT '',
  `og_description`      VARCHAR(320) NOT NULL DEFAULT '',
  `og_image_url`        VARCHAR(500) NULL,

  `faqs`                LONGTEXT     NULL,
  `auto_article_schema` TINYINT(1)   NOT NULL DEFAULT 1,
  `auto_faq_schema`     TINYINT(1)   NOT NULL DEFAULT 1,
  `custom_schemas`      LONGTEXT     NULL,

  `created_at`          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`          CHAR(36)     NULL,
  `updated_by`          CHAR(36)     NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_posts_type_slug` (`post_type`, `slug`),
  KEY `idx_posts_public` (`status`, `published_at`),
  KEY `idx_posts_updated` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Old slugs -> post. Written automatically when a published post's slug
-- changes, so the old URL redirects to the new one instead of 404ing.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `post_redirects` (
  `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_type`  VARCHAR(20)     NOT NULL DEFAULT 'blog',
  `old_slug`   VARCHAR(190)    NOT NULL,
  `post_id`    CHAR(36)        NOT NULL,
  `created_at` DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_redirect_slug` (`post_type`, `old_slug`),
  KEY `idx_redirect_post` (`post_id`),
  CONSTRAINT `fk_redirect_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Uploaded images. Stored in the database (served from /media/<id>) so
-- they survive redeploys of the website.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `media` (
  `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mime`       VARCHAR(50)     NOT NULL,
  `size`       INT UNSIGNED    NOT NULL,
  `data`       LONGBLOB        NOT NULL,
  `created_by` CHAR(36)        NULL,
  `created_at` DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Enquiries submitted through the website forms (Admin -> Leads).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id`         CHAR(36)      NOT NULL,
  `created_at` DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `form_name`  VARCHAR(100)  NOT NULL DEFAULT '',
  `name`       VARCHAR(150)  NOT NULL DEFAULT '',
  `email`      VARCHAR(190)  NOT NULL DEFAULT '',
  `phone`      VARCHAR(40)   NOT NULL DEFAULT '',
  `message`    VARCHAR(2000) NOT NULL DEFAULT '',
  `page_title` VARCHAR(200)  NOT NULL DEFAULT '',
  `page_url`   VARCHAR(500)  NOT NULL DEFAULT '',
  `referrer`   VARCHAR(500)  NOT NULL DEFAULT '',
  `device`     VARCHAR(255)  NOT NULL DEFAULT '',
  `ip`         VARCHAR(64)   NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `idx_leads_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
