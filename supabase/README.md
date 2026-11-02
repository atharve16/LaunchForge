# Supabase project notes

Supabase provides Auth and managed PostgreSQL. Prisma is the selected and only application ORM/migration tool, so the canonical Supabase PostgreSQL schema and reviewed SQL migration live at `apps/api/prisma/schema.prisma` and `apps/api/prisma/migrations`.

This directory is reserved for a future `supabase/config.toml`, Storage policies or Edge Function configuration if those Supabase-specific capabilities are introduced. Do not copy the schema migration here; duplicate migration histories would create drift.
