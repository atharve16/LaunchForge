# LaunchForge

Production-oriented Phase 1 foundation for a senior-led startup product and engineering partner. The repository is an npm-workspaces monorepo with a Next.js application, a separate NestJS REST API, shared TypeScript contracts, Prisma/PostgreSQL migrations, tests and operating documentation.

## Project structure

```text
apps/
  web/                 Next.js 16 App Router, Tailwind CSS 4, Supabase SSR auth
  api/                 NestJS 12 REST API, Prisma 7, Supabase JWT verification
packages/
  shared/              Browser-safe request/response contracts and enums
docs/
  architecture.md
  authentication.md
  database.md
  api.md
supabase/               Reserved for future Supabase CLI configuration
```

The canonical schema and SQL migrations live in `apps/api/prisma`. Supabase provides managed PostgreSQL and Auth; the NestJS API owns normal application database access.

## Prerequisites

- Node.js 22.18 or newer
- npm 11 or newer
- A Supabase project with asymmetric JWT signing keys
- PostgreSQL connection details from Supabase

## Local setup

1. Install dependencies from the committed lockfile:

   ```bash
   npm ci
   ```

2. Copy `apps/web/.env.example` to `apps/web/.env.local` and `apps/api/.env.example` to `apps/api/.env`.
3. Add project-specific values. Do not place service-role keys, database passwords or OAuth secrets in frontend variables.
4. Generate the Prisma client and apply the migration to a non-production database. `DIRECT_URL` is mandatory for migration commands and `migrate dev` runs only with `NODE_ENV=development`:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Run the applications in separate terminals:

   ```bash
   npm run dev:web
   npm run dev:api
   ```

Web: `http://localhost:3000`  
API: `http://localhost:4000/api/v1`  
Swagger: `http://localhost:4000/api/docs`

## Supabase setup

1. Create a project and copy its URL and publishable/anon key to the web environment.
2. Create a least-privilege runtime database login. Put its pooler URL in `DATABASE_URL`. Put a separate migration-owner direct connection in `DIRECT_URL`; the API process never reads `DIRECT_URL`.
3. Configure Auth site URL as `http://localhost:3000` locally.
4. Add exact redirect URLs:
   - `http://localhost:3000/auth/callback`
   - the exact production origin plus `/auth/callback`
5. Enable Email provider. Decide whether email confirmation is required.
6. In **Authentication → Signing Keys**, confirm the active key is asymmetric. The API accepts only `ES256` and `RS256`. Copy the exact issuer, audience and JWKS URL shown in `apps/api/.env.example`; tokens must include an expiration claim.
7. Apply the version-controlled migration with Prisma. It revokes direct `anon` and `authenticated` access to application tables; the API connects as the database user instead.

## Production configuration

- Set every `NEXT_PUBLIC_*` value before `next build`; Next.js embeds these values into browser assets and statically generated metadata. Production/staging builds reject missing, malformed or non-HTTPS public URLs.
- Serve the web application only over HTTPS. Supabase session cookies are `Secure` outside local development, use `SameSite=Lax`, and intentionally remain browser-readable for the Supabase SSR client. Enable HSTS at the production edge.
- Run `npm run db:migrate:deploy` as a release step with `DIRECT_URL` available only to that step. Never expose `DIRECT_URL` to the normal API process.

## Google OAuth setup

1. Create a Google OAuth web application in Google Cloud.
2. Add Supabase’s provider callback URL from **Authentication → Providers → Google** as an authorized Google redirect URI. It normally has the form `https://<project-ref>.supabase.co/auth/v1/callback`.
3. Add the Google client ID and secret only in the Supabase dashboard.
4. Enable Google in Supabase Auth.
5. Keep the application callback URLs above in Supabase’s redirect allowlist.
6. Test new account, existing account, cancellation, expired code, missing code and network failure flows in the target environment.

OAuth is implemented but is **not considered operational** until provider credentials and all redirects are configured and tested.

## Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run format:check
npm run db:migrate:deploy
```

## Current scope

Implemented: complete public route foundation, responsive design system, password/Google/magic-link UI, PKCE callback, session refresh, protected layouts, idempotent user provisioning, backend JWT verification, backend roles, lead submission/storage, public read APIs, client projects read API, read-only admin lead view, Swagger and tests.

Requires configuration: Supabase project, PostgreSQL migration, Google provider, production origins, optional calendar URL and first trusted admin promotion.

Intentionally unavailable: unapproved prices, testimonials, team biographies, case studies, blog content, admin content mutation, project milestones, notifications, email delivery and all Phase 2 marketplace capabilities.
