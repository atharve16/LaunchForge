# Architecture

## Boundaries

The browser and Next.js server render UI, manage Supabase cookie sessions and call the API. They do not decide roles, ownership or other sensitive business rules. NestJS validates every request, verifies protected requests independently, performs authorization and owns all application-table reads and writes.

```text
Browser → Next.js App Router → Supabase Auth
   │            │
   └─ Bearer access token ─→ NestJS REST API → Prisma → Supabase PostgreSQL
                                  │
                                  └─ Supabase JWKS (signature verification)
```

The applications deploy independently. No Vercel-specific or Supabase-hosting-specific application logic is required. Configuration uses environment variables and standard HTTP/PostgreSQL interfaces.

## Frontend

- React Server Components are the default.
- Client components are limited to navigation, auth forms, the lead form and process interaction.
- Route groups separate marketing, auth, client dashboard and admin shells.
- A central API client owns base URL, response parsing and authenticated headers.
- CSS custom properties are the single source of truth for brand tokens; Tailwind 4 maps semantic utilities to those variables.
- Static service copy is centralized. Database-backed services and case studies are exposed separately and contain no seed/demo records.

## Backend

- Feature modules: auth, users, leads, services, engagements, projects, case studies and health.
- Global validation strips unknown fields and rejects non-whitelisted input.
- Errors and successful payloads use consistent envelopes.
- Request logging records method, path, status, duration and request ID, never bodies or authorization headers.
- CORS is allowlisted, Helmet is enabled and throttling is global with a tighter lead limit.
- Prisma is the only ORM. PostgreSQL driver pooling is handled by `@prisma/adapter-pg`.

## Future marketplace compatibility

The user UUID remains the Supabase identity key while application role/status remain backend controlled. Project ownership is explicit. Future proposals, messaging, milestones and payments can be added as feature modules and tables without changing the authentication system. None are pre-created now.

## Deployment notes

- Deploy web and API as separate services.
- Run `prisma migrate deploy` as an explicit release step before API rollout.
- Use health checks at `/api/v1/health`.
- Keep authenticated responses uncached. Supabase session refresh responses use private/no-store headers.
- The built-in throttler is per-instance. If the API later scales horizontally, replace its storage with a shared implementation after that requirement exists.
