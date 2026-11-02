import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import type { AuthUser } from './auth.types.js';

export const SUPPORTED_SUPABASE_JWT_ALGORITHMS = ['ES256', 'RS256'] as const;

@Injectable()
export class AuthService {
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;
  private readonly issuer: string;
  private readonly audience: string;

  constructor(config: ConfigService) {
    this.jwks = createRemoteJWKSet(new URL(config.getOrThrow<string>('SUPABASE_JWKS_URL')), {
      cooldownDuration: 20_000,
      cacheMaxAge: 600_000,
    });
    this.issuer = config.getOrThrow<string>('SUPABASE_ISSUER').replace(/\/$/, '');
    this.audience = config.getOrThrow<string>('SUPABASE_AUDIENCE');
  }

  async verifyAccessToken(token: string): Promise<AuthUser> {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: this.audience,
        algorithms: [...SUPPORTED_SUPABASE_JWT_ALGORITHMS],
        requiredClaims: ['exp', 'sub', 'email'],
        clockTolerance: 5,
      });
      return this.toAuthUser(payload);
    } catch {
      throw new UnauthorizedException({
        code: 'INVALID_ACCESS_TOKEN',
        message: 'Authentication token is invalid or expired.',
      });
    }
  }

  private toAuthUser(payload: JWTPayload): AuthUser {
    const email = typeof payload.email === 'string' ? payload.email : undefined;
    if (!payload.sub || !email) {
      throw new UnauthorizedException({
        code: 'INVALID_ACCESS_TOKEN',
        message: 'Authentication token is missing required claims.',
      });
    }
    const metadata: Record<string, unknown> =
      payload.user_metadata && typeof payload.user_metadata === 'object'
        ? (payload.user_metadata as Record<string, unknown>)
        : {};
    return {
      id: payload.sub,
      email,
      fullName: typeof metadata.full_name === 'string' ? metadata.full_name : undefined,
      avatarUrl: typeof metadata.avatar_url === 'string' ? metadata.avatar_url : undefined,
    };
  }
}
