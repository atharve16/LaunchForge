# REST API

Base URL: `/api/v1`  
Interactive OpenAPI: `/api/docs`

All normal responses are `{ "success": true, "data": ... }`. Errors are `{ "success": false, "error": { "code", "message", "requestId", "details?" } }`. Internal exception details are not returned.

## Public endpoints

- `GET /health` — liveness information.
- `POST /leads` — validated contact submission; five requests/minute/IP, honeypot, form-age check and idempotent same-day duplicates.
- `GET /services` and `GET /services/:slug` — published records only.
- `GET /engagements` — published records only.
- `GET /case-studies` and `GET /case-studies/:slug` — published records only.

## Authenticated endpoints

- `POST /users/me/provision` — idempotently create/refresh profile.
- `GET /users/me` — retrieve profile (and provision if missing).
- `GET /projects` — client-owned projects; an admin may read all.

## Admin endpoints

- `GET /leads` — paginated lead list; requires an active `ADMIN` database role.

Admin mutation endpoints do not exist yet, so the UI labels those functions unavailable. Swagger documents the implemented contract only.

## Lead behavior

Required input is name, email, stage, one or more services, budget range, 30–5000 character description and a short-lived browser form token. `website` is a honeypot. Unknown fields are rejected. A repeated identical email/description on the same UTC date returns the original record rather than creating duplicates.

Email notifications are not sent because no provider, sender identity or approved recipient is configured. Add that later as a post-commit integration with retry/audit behavior; database persistence must remain the source of truth.
