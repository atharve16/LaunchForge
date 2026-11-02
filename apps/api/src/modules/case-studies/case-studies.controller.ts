import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service.js';

@ApiTags('case studies')
@Controller('case-studies')
export class CaseStudiesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        technologies: true,
        thumbnailUrl: true,
        publishedAt: true,
      },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const item = await this.prisma.caseStudy.findFirst({ where: { slug, isPublished: true } });
    if (!item)
      throw new NotFoundException({
        code: 'CASE_STUDY_NOT_FOUND',
        message: 'Case study not found.',
      });
    return item;
  }
}
