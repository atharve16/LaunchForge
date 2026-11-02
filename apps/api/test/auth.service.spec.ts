import { UnauthorizedException } from '@nestjs/common';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { exportJWK, generateKeyPair, SignJWT, type CryptoKey, type JWK } from 'jose';
import { AuthService } from '../src/modules/auth/auth.service.js';

describe('AuthService', () => {
  const audience = 'authenticated';
  const subject = '7b70d22a-5c98-4e45-a972-97365a3af78a';
  let server: Server;
  let issuer: string;
  let jwksUrl: string;
  let validPrivateKey: CryptoKey;
  let otherPrivateKey: CryptoKey;
  let validJwk: JWK;

  beforeAll(async () => {
    const validPair = await generateKeyPair('ES256');
    const otherPair = await generateKeyPair('ES256');
    validPrivateKey = validPair.privateKey;
    otherPrivateKey = otherPair.privateKey;
    validJwk = {
      ...(await exportJWK(validPair.publicKey)),
      alg: 'ES256',
      kid: 'valid-key',
      use: 'sig',
    };

    server = createServer((request, response) => {
      if (request.url === '/auth/v1/.well-known/failure.json') {
        response.writeHead(503).end();
        return;
      }
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ keys: [validJwk] }));
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address() as AddressInfo;
    issuer = `http://127.0.0.1:${port}/auth/v1`;
    jwksUrl = `${issuer}/.well-known/jwks.json`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  });

  function service(url = jwksUrl): AuthService {
    const values: Record<string, string> = {
      SUPABASE_JWKS_URL: url,
      SUPABASE_ISSUER: issuer,
      SUPABASE_AUDIENCE: audience,
    };
    return new AuthService({ getOrThrow: (key: string) => values[key] } as never);
  }

  async function signToken(
    options: {
      privateKey?: CryptoKey;
      algorithm?: 'ES256' | 'HS256';
      kid?: string;
      tokenIssuer?: string;
      tokenAudience?: string;
      expiration?: number | string | false;
    } = {},
  ): Promise<string> {
    const algorithm = options.algorithm ?? 'ES256';
    const key =
      algorithm === 'HS256'
        ? new TextEncoder().encode('test-only-symmetric-key-with-32-bytes')
        : (options.privateKey ?? validPrivateKey);
    let token = new SignJWT({ email: 'founder@example.com' })
      .setProtectedHeader({ alg: algorithm, kid: options.kid ?? 'valid-key' })
      .setSubject(subject)
      .setIssuer(options.tokenIssuer ?? issuer)
      .setAudience(options.tokenAudience ?? audience)
      .setIssuedAt();
    if (options.expiration !== false) {
      token = token.setExpirationTime(options.expiration ?? '5m');
    }
    return token.sign(key);
  }

  it('accepts a valid asymmetric Supabase access token', async () => {
    await expect(service().verifyAccessToken(await signToken())).resolves.toEqual({
      id: subject,
      email: 'founder@example.com',
      fullName: undefined,
      avatarUrl: undefined,
    });
  });

  it.each([
    ['invalid signature', () => signToken({ privateKey: otherPrivateKey })],
    ['unsupported algorithm', () => signToken({ algorithm: 'HS256' })],
    ['invalid issuer', () => signToken({ tokenIssuer: 'https://attacker.invalid/auth/v1' })],
    ['invalid audience', () => signToken({ tokenAudience: 'other-audience' })],
    ['expired token', () => signToken({ expiration: Math.floor(Date.now() / 1000) - 60 })],
    ['missing expiration', () => signToken({ expiration: false })],
    ['unknown key id', () => signToken({ privateKey: otherPrivateKey, kid: 'unknown-key' })],
  ])('rejects %s', async (_name, createToken) => {
    await expect(service().verifyAccessToken(await createToken())).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('fails closed when the JWKS endpoint is unavailable', async () => {
    const failureUrl = jwksUrl.replace('jwks.json', 'failure.json');
    await expect(service(failureUrl).verifyAccessToken(await signToken())).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
