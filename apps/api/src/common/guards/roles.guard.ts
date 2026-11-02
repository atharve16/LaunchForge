import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import type { UserRole } from '../../generated/prisma/enums.js';
import { PrismaService } from '../../database/prisma.service.js';
import type { AuthenticatedRequest } from '../../modules/auth/auth.types.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles?.length) return true;
    const { authUser } = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const profile = await this.prisma.user.findUnique({
      where: { id: authUser.id },
      select: { role: true, accountStatus: true },
    });
    if (!profile || profile.accountStatus !== 'ACTIVE' || !roles.includes(profile.role)) {
      throw new ForbiddenException({
        code: 'INSUFFICIENT_PERMISSION',
        message: 'You do not have permission to access this resource.',
      });
    }
    return true;
  }
}
