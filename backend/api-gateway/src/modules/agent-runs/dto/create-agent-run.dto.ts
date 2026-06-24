import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAgentRunDto {
  @ApiPropertyOptional({
    example: 'llama3',
  })
  @IsOptional()
  @IsString()
  modelUsed?: string;
}