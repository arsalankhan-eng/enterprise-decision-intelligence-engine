import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { InputPriority } from '../enums/input-priority.enum';
import { InputType } from '../enums/input-type-enum';

export class CreateAssessmentInputDto {
  @ApiProperty({
    enum: InputType,
  })
  @IsEnum(InputType)
  type!: InputType;

  @ApiProperty({
    enum: InputPriority,
  })
  @IsEnum(InputPriority)
  priority!: InputPriority;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;
}