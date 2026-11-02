# Authentication and authorization

## Browser and server flow

The web app uses `@supabase/ssr` and cookie-backed PKCE sessions. Browser and server clients are separate. Next.js 16 `proxy.ts` refreshes claims/session cookies and performs only an optimistic route check; it is not the API security boundary. Cookie policy is shared across browser, server and proxy clients: `Secure` outside local development, `SameSite=Lax`, path `/`, and intentionally not `HttpOnly` because the browser Supabase client must refresh the session. Production and staging must use HTTPS and HSTS.

Password signup sends verification to `/auth/callback`. Password login establishes the cookie session. Magic-link login uses the same callback. Google starts Supabase OAuth with an explicit application callback URL.

The callback:

1. rejects a missing authorization code;
2. exchanges the PKCE code for a session;
3. validates `next` against `/dashboard` and `/admin` route roots to prevent open redirects;
4. calls the protected idempotent profile-provisioning endpoint;
5. redirects to the intended safe route, or marks provisioning as pending if the API is unavailable.

OAuth cancellation, expired/invalid code and missing session return to login with a generic safe error. Provider-specific details are not exposed.

## API verification

NestJS accepts `Authorization: Bearer <Supabase access token>`. It uses `jose` with the configured remote JWKS and verifies:

- asymmetric signature (`ES256` or `RS256` only);
- exact issuer;
- configured audience (`authenticated` by default);
- required expiration, subject and email claims;
- expiration/not-before validation with five seconds clock tolerance.

Decoding alone is never treated as authentication. The API never issues a parallel application JWT.

Before connecting an environment, open Supabase **Authentication → Signing Keys** and verify an asymmetric signing key is active. Confirm the project JWT documentation reports the exact issuer ending in `/auth/v1`, audience `authenticated` (unless deliberately changed), and JWKS endpoint ending in `/auth/v1/.well-known/jwks.json`. The issuer and JWKS URL must share an HTTPS origin in production. Legacy shared-secret `HS256` tokens are rejected; there is no fallback when JWKS retrieval or verification fails.

## Profiles and roles

`users.id` is the Supabase Auth UUID. Provisioning is an upsert that refreshes trusted identity fields and assigns `CLIENT` only on first creation. It never reads a requested role from the frontend or token metadata. Disabled/deleted application accounts are rejected.

Roles are `ADMIN`, `CLIENT` and `DEVELOPER`. Admin guards query the database for the current role and account status. To bootstrap the first admin, an authorized database operator must verify the Supabase UUID and run a controlled data update. This is intentionally not self-service. Record that operation in the deployment/change log.

Email changes originate in Supabase Auth and are synchronized on the next provisioning call. Account linking is managed by Supabase. Deletion/disable workflows require a future privileged backend operation so the Auth identity and application data can be coordinated safely.
