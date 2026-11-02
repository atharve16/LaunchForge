import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import type { AuthUser } from '../auth/auth.types.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async provisionProfile(identity: AuthUser) {
    const existing = await this.prisma.user.findUnique({ where: { id: identity.id } });
    if (existing && existing.accountStatus !== 'ACTIVE') {
      throw new ForbiddenException({
        code: 'ACCOUNT_DISABLED',
        message: 'This account is not active.',
      });
    }

    return this.prisma.user.upsert({
      where: { id: identity.id },
      create: {
        id: identity.id,
        email: identity.email.toLowerCase(),
        fullName: identity.fullName,
        avatarUrl: identity.avatarUrl,
        role: 'CLIENT',
      },
      update: {
        email: identity.email.toLowerCase(),
        ...(identity.fullName ? { fullName: identity.fullName } : {}),
        ...(identity.avatarUrl ? { avatarUrl: identity.avatarUrl } : {}),
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        phoneNumber: true,
        role: true,
        accountStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
