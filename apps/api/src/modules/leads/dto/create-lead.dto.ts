import { Transform, Type, type TransformFnParams } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { budgetRanges, startupStages } from '@launchforge/shared';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : (value as unknown);
const normalizeEmail = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim().toLowerCase() : (value as unknown);

export class CreateLeadDto {
  @ApiProperty({ example: 'Aarav Sharma' })
  @Transform(trim)
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 'aarav@example.com' })
  @Transform(normalizeEmail)
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @ApiPropertyOptional()
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  companyName?: string;

  @ApiProperty({ enum: startupStages })
  @IsIn(startupStages)
  startupStage!: (typeof startupStages)[number];

  @ApiProperty({ type: [String], minItems: 1, maxItems: 6 })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  @MaxLength(80, { each: true })
  servicesNeeded!: string[];

  @ApiProperty({ enum: budgetRanges })
  @IsIn(budgetRanges)
  budgetRange!: (typeof budgetRanges)[number];

  @ApiProperty()
  @Transform(trim)
  @IsString()
  @MinLength(30)
  @MaxLength(5000)
  projectDescription!: string;

  @ApiPropertyOptional({ description: 'Spam honeypot; must remain empty.' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;

  @ApiProperty({
    description: 'Client form timestamp and UUID generated when the form becomes interactive.',
  })
  @IsString()
  @Matches(/^\d{13}\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  submissionToken!: string;
}

export class LeadQueryDto {
  @IsOptional()
  @IsIn(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED'])
  status?: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'CLOSED';

  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize = 25;
}
