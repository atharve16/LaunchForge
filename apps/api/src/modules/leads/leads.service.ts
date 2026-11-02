import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'node:crypto';
import { PrismaService } from '../../database/prisma.service.js';
import type { CreateLeadDto, LeadQueryDto } from './dto/create-lead.dto.js';

@Injectable()
export class LeadsService {
  private readonly dedupSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService,
  ) {
    this.dedupSecret = config.getOrThrow<string>('LEAD_DEDUP_SECRET');
  }

  async create(dto: CreateLeadDto) {
    this.assertHumanSubmission(dto);
    const dayBucket = new Date().toISOString().slice(0, 10);
    const submissionHash = createHmac('sha256', this.dedupSecret)
      .update(`${dto.email}|${dto.projectDescription.toLowerCase()}|${dayBucket}`)
      .digest('hex');

    const lead = await this.prisma.lead.upsert({
      where: { submissionHash_email: { submissionHash, email: dto.email } },
      update: {},
      create: {
        name: dto.name,
        email: dto.email,
        companyName: dto.companyName || null,
        startupStage: dto.startupStage,
        servicesNeeded: [...new Set(dto.servicesNeeded)],
        budgetRange: dto.budgetRange,
        projectDescription: dto.projectDescription,
        source: 'WEBSITE',
        submissionHash,
      },
      select: { id: true, status: true, createdAt: true },
    });

    return { ...lead, createdAt: lead.createdAt.toISOString() };
  }

  async findAll(query: LeadQueryDto) {
    const page = Math.max(1, Math.floor(query.page || 1));
    const pageSize = Math.min(100, Math.max(1, Math.floor(query.pageSize || 25)));
    const where = query.status ? { status: query.status } : {};
    const [items, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          email: true,
          companyName: true,
          startupStage: true,
          servicesNeeded: true,
          budgetRange: true,
          projectDescription: true,
          source: true,
          status: true,
          assignedToId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.lead.count({ where }),
    ]);
    return {
      items,
      pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  private assertHumanSubmission(dto: CreateLeadDto): void {
    if (dto.website) {
      throw new BadRequestException({
        code: 'SUBMISSION_REJECTED',
        message: 'Unable to submit this request.',
      });
    }
    const timestamp = Number(dto.submissionToken.split('.')[0]);
    const age = Date.now() - timestamp;
    if (!Number.isFinite(timestamp) || age < 2_000 || age > 2 * 60 * 60 * 1000) {
      throw new BadRequestException({
        code: 'FORM_TOKEN_INVALID',
        message: 'The form session expired. Please refresh and try again.',
      });
    }
  }
}
