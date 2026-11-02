import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const migrationCommandIndex = process.argv.indexOf('migrate');
const migrationSubcommand =
  migrationCommandIndex >= 0 ? process.argv[migrationCommandIndex + 1] : undefined;
const directUrl = process.env.DIRECT_URL?.trim();

if (migrationCommandIndex >= 0 && !directUrl) {
  throw new Error(
    'DIRECT_URL is required for Prisma migration commands. DATABASE_URL is runtime-only.',
  );
}

if (migrationSubcommand === 'dev' && process.env.NODE_ENV !== 'development') {
  throw new Error(
    'prisma migrate dev is restricted to NODE_ENV=development. Use migrate deploy for releases.',
  );
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: { path: './prisma/migrations' },
  // Schema-only commands need a syntactically valid URL but never connect to this fallback.
  datasource: { url: directUrl ?? 'postgresql://localhost:5432/launchforge' },
});
