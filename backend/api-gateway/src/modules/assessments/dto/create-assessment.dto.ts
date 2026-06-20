import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  Min,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateAssessmentDto {
  @ApiProperty({
    example: 'Cloud Migration Assessment',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example:
      'ABC Bank wants to migrate 20 million users to AWS in 18 months.',
  })
  @IsString()
  @IsNotEmpty()
  scenario!: string;

  @ApiProperty({
    example: 'Banking',
  })
  @IsString()
  @IsNotEmpty()
  industry!: string;

  @ApiPropertyOptional({
    example: 20000000,
  })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({
    example: 18,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  timelineMonths?: number;

  @ApiProperty({
    example:
      '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  projectId!: string;
}