import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { SupabaseAuthGuard } from '../../common/guards/supabase-auth.guard.js';
import { ActiveAccountGuard } from '../../common/guards/active-account.guard.js';
import { PrismaService } from '../../database/prisma.service.js';
import type { AuthUser } from '../auth/auth.types.js';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard, ActiveAccountGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findMine(@CurrentUser() user: AuthUser) {
    const profile = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });
    return this.prisma.project.findMany({
      where: profile?.role === 'ADMIN' ? {} : { clientId: user.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
