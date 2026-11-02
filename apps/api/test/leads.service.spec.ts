import { BadRequestException } from '@nestjs/common';
import { jest } from '@jest/globals';
import { LeadsService } from '../src/modules/leads/leads.service.js';

describe('LeadsService', () => {
  const prisma = {
    lead: {
      upsert: jest.fn<(args: unknown) => Promise<{ id: string; status: 'NEW'; createdAt: Date }>>(),
    },
  };
  const config = {
    getOrThrow: jest.fn().mockReturnValue('a-secure-test-secret-that-is-long-enough'),
  };
  const service = new LeadsService(prisma as never, config as never);
  const valid = {
    name: 'Founder Name',
    email: 'founder@example.com',
    startupStage: 'IDEA' as const,
    servicesNeeded: ['idea-explosion'],
    budgetRange: 'NOT_SURE' as const,
    projectDescription: 'A detailed description of the product problem and intended users.',
    submissionToken: `${Date.now() - 3_000}.550e8400-e29b-41d4-a716-446655440000`,
  };

  it('creates a validated lead using an idempotent upsert', async () => {
    prisma.lead.upsert.mockResolvedValueOnce({
      id: 'lead-id',
      status: 'NEW',
      createdAt: new Date('2026-10-31T00:00:00Z'),
    });
    await expect(service.create(valid)).resolves.toEqual({
      id: 'lead-id',
      status: 'NEW',
      createdAt: '2026-10-31T00:00:00.000Z',
    });
    expect(prisma.lead.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { submissionHash_email: expect.any(Object) } }),
    );
  });

  it('rejects the honeypot field', async () => {
    await expect(service.create({ ...valid, website: 'spam.example' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rejects an immediately generated token', async () => {
    await expect(
      service.create({
        ...valid,
        submissionToken: `${Date.now()}.550e8400-e29b-41d4-a716-446655440000`,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
