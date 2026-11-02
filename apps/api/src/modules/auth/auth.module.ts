import { Module } from '@nestjs/common';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { ActiveAccountGuard } from '../../common/guards/active-account.guard.js';
import { AuthService } from './auth.service.js';

@Module({
  providers: [AuthService, SupabaseAuthGuard, ActiveAccountGuard, RolesGuard],
  exports: [AuthService, SupabaseAuthGuard, ActiveAccountGuard, RolesGuard],
})
export class AuthModule {}
