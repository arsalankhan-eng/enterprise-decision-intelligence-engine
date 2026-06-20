import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { ProjectStatus } from '../enums/project-status.enum';

export class UpdateProjectDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    enum: ProjectStatus,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}