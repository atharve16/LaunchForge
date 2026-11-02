import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard.js';
import type { AuthUser } from '../auth/auth.types.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('me/provision')
  @ApiOperation({ summary: 'Idempotently create or refresh the authenticated application profile' })
  provision(@CurrentUser() user: AuthUser) {
    return this.usersService.provisionProfile(user);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get the authenticated application profile' })
  getMe(@CurrentUser() user: AuthUser) {
    return this.usersService.provisionProfile(user);
  }
}
