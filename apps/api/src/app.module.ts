import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { validateEnvironment } from './config/env.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CaseStudiesModule } from './modules/case-studies/case-studies.module.js';
import { EngagementsModule } from './modules/engagements/engagements.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { LeadsModule } from './modules/leads/leads.module.js';
import { ProjectsModule } from './modules/projects/projects.module.js';
import { ServicesModule } from './modules/services/services.module.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnvironment }),
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 120 }]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    LeadsModule,
    ServicesModule,
    EngagementsModule,
    ProjectsModule,
    CaseStudiesModule,
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
