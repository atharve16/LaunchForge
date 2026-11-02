CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT', 'DEVELOPER');
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'DISABLED', 'DELETED');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED');
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED');
CREATE TYPE "BlogPostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "PricingType" AS ENUM ('QUOTE', 'INDICATIVE', 'HOURLY');

CREATE TABLE "users" (
  "id" UUID PRIMARY KEY,
  "email" VARCHAR(320) NOT NULL UNIQUE,
  "full_name" VARCHAR(160),
  "avatar_url" TEXT,
  "phone_number" VARCHAR(32),
  "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
  "account_status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "leads" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(120) NOT NULL,
  "email" VARCHAR(320) NOT NULL,
  "company_name" VARCHAR(160),
  "startup_stage" VARCHAR(40) NOT NULL,
  "services_needed" TEXT[] NOT NULL,
  "budget_range" VARCHAR(60) NOT NULL,
  "project_description" TEXT NOT NULL,
  "source" VARCHAR(80) NOT NULL DEFAULT 'WEBSITE',
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "assigned_to" UUID,
  "submission_hash" VARCHAR(64) NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "leads_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL,
  CONSTRAINT "leads_submission_hash_email_key" UNIQUE ("submission_hash", "email"),
  CONSTRAINT "leads_services_needed_nonempty" CHECK (cardinality("services_needed") > 0),
  CONSTRAINT "leads_description_length" CHECK (char_length("project_description") BETWEEN 30 AND 5000)
);

CREATE TABLE "services" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(120) NOT NULL,
  "slug" VARCHAR(140) NOT NULL UNIQUE,
  "short_description" VARCHAR(280) NOT NULL,
  "description" TEXT NOT NULL,
  "icon" VARCHAR(80),
  "is_published" BOOLEAN NOT NULL DEFAULT false,
  "display_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "services_display_order_nonnegative" CHECK ("display_order" >= 0)
);

CREATE TABLE "engagement_packages" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(120) NOT NULL,
  "slug" VARCHAR(140) NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "features" TEXT[] NOT NULL,
  "pricing_type" "PricingType" NOT NULL DEFAULT 'QUOTE',
  "indicative_price" VARCHAR(120),
  "is_published" BOOLEAN NOT NULL DEFAULT false,
  "display_order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "engagement_features_nonempty" CHECK (cardinality("features") > 0),
  CONSTRAINT "engagement_display_order_nonnegative" CHECK ("display_order" >= 0)
);

CREATE TABLE "projects" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(160) NOT NULL,
  "slug" VARCHAR(180) NOT NULL UNIQUE,
  "description" TEXT,
  "client_id" UUID NOT NULL,
  "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT
);

CREATE TABLE "case_studies" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" VARCHAR(180) NOT NULL,
  "slug" VARCHAR(200) NOT NULL UNIQUE,
  "summary" VARCHAR(400) NOT NULL,
  "challenge" TEXT NOT NULL,
  "solution" TEXT NOT NULL,
  "outcome" TEXT NOT NULL,
  "technologies" TEXT[] NOT NULL,
  "thumbnail_url" TEXT,
  "is_published" BOOLEAN NOT NULL DEFAULT false,
  "published_at" TIMESTAMPTZ(6),
  CONSTRAINT "case_studies_publish_state" CHECK (NOT "is_published" OR "published_at" IS NOT NULL)
);

CREATE TABLE "blog_posts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" VARCHAR(180) NOT NULL,
  "slug" VARCHAR(200) NOT NULL UNIQUE,
  "excerpt" VARCHAR(400) NOT NULL,
  "content" TEXT NOT NULL,
  "cover_image" TEXT,
  "author_id" UUID NOT NULL,
  "status" "BlogPostStatus" NOT NULL DEFAULT 'DRAFT',
  "published_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "blog_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT,
  CONSTRAINT "blog_posts_publish_state" CHECK ("status" <> 'PUBLISHED' OR "published_at" IS NOT NULL)
);

CREATE INDEX "users_role_account_status_idx" ON "users"("role", "account_status");
CREATE INDEX "leads_status_created_at_idx" ON "leads"("status", "created_at" DESC);
CREATE INDEX "leads_email_created_at_idx" ON "leads"("email", "created_at" DESC);
CREATE INDEX "services_published_order_idx" ON "services"("is_published", "display_order");
CREATE INDEX "engagements_published_order_idx" ON "engagement_packages"("is_published", "display_order");
CREATE INDEX "projects_client_status_idx" ON "projects"("client_id", "status");
CREATE INDEX "case_studies_published_at_idx" ON "case_studies"("is_published", "published_at" DESC);
CREATE INDEX "blog_posts_status_published_at_idx" ON "blog_posts"("status", "published_at" DESC);

-- Roles are application-controlled. Supabase Auth users cannot write these tables directly.
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
