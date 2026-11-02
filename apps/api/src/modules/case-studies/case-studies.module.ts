import { Module } from '@nestjs/common';
import { CaseStudiesController } from './case-studies.controller.js';

@Module({ controllers: [CaseStudiesController] })
export class CaseStudiesModule {}
