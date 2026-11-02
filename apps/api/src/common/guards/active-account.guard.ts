import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import type { AuthenticatedRequest } from '../../modules/auth/auth.types.js';

@Injectable()
export class ActiveAccountGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authUser } = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const profile = await this.prisma.user.findUnique({
      where: { id: authUser.id },
      select: { accountStatus: true },
    });
    if (!profile || profile.accountStatus !== 'ACTIVE') {
      throw new ForbiddenException({
        code: 'ACCOUNT_INACTIVE',
        message: 'An active application profile is required.',
      });
    }
    return true;
  }
}
