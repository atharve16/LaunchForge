# Database

## Ownership and migrations

Supabase hosts PostgreSQL and Auth. NestJS is the only normal application-table data-access path. Prisma 7 supplies typed queries and transactions. `apps/api/prisma/schema.prisma` and its timestamped migration are canonical and version controlled.

Never edit production schema manually. Generate a migration in development, review its SQL, test it against a disposable Supabase project, then run `prisma migrate deploy` in the release workflow.

Use separate credentials:

- `DATABASE_URL` is the least-privilege runtime login through the Supabase pooler. It belongs only to the API runtime.
- `DIRECT_URL` is a migration-owner direct connection. Prisma migration commands require it; the normal API configuration does not read it.

`npm run db:migrate` aliases the development-only `migrate dev` command. Releases must use `npm run db:migrate:deploy`. Store both connection values in the environment's secret manager, never in source control.

The initial runtime role must be created manually after the migration exists. Grant it connection/schema access and only the table operations the current API needs; do not grant ownership, DDL, role administration, `BYPASSRLS`, or access to the `auth` schema. Future migrations must explicitly extend privileges when new write workflows are approved.

## Initial entities

- `users`: application profile keyed by Supabase Auth UUID; unique email; controlled role and account status.
- `leads`: validated discovery enquiries, assignment, status and a daily HMAC deduplication key.
- `services`: publishable service content.
- `engagement_packages`: quote/indicative/hourly presentation model; current UI publishes quote-based static content only.
- `projects`: minimal client-owned record with lifecycle status.
- `case_studies`: publishable evidence with a constraint requiring `published_at`.
- `blog_posts`: draft/published/archived content owned by an author.

Foreign keys use restrictive or set-null deletion deliberately. Query paths have indexes. UUIDs and timestamps are database-native. Array fields are constrained non-empty where appropriate.

The migration revokes application-table privileges from Supabase `anon` and `authenticated` roles. This prevents accidental browser access if someone creates a Supabase client for the public schema. Database credentials stay in the API environment.

## Transactions

Paginated lead listing uses a transaction for rows plus count. Future multi-write workflows (project creation with membership, milestones/payments, deletion lifecycle) must use transactions. The current lead create is an atomic upsert keyed by email and HMAC content/day bucket.

No fake data or production seed is included.
