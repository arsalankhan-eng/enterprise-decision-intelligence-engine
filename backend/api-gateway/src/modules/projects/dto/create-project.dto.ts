import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ProjectStatus } from '../enums/project-status.enum';

export class CreateProjectDto {
  @ApiProperty({
    example: 'ABC Bank Cloud Migration',
    description: 'Project name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional({
    example: 'Migration of 20 million users to AWS',
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    enum: ProjectStatus,
    example: ProjectStatus.DRAFT,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}