import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service.js';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        description: true,
        icon: true,
      },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const service = await this.prisma.service.findFirst({
      where: { slug, isPublished: true },
      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        description: true,
        icon: true,
      },
    });
    if (!service)
      throw new NotFoundException({ code: 'SERVICE_NOT_FOUND', message: 'Service not found.' });
    return service;
  }
}
