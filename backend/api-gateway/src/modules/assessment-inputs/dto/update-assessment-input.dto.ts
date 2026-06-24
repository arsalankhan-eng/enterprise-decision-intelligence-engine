import {
  PartialType,
} from '@nestjs/swagger';

import { CreateAssessmentInputDto } from './create-assessment-input.dto';

export class UpdateAssessmentInputDto extends PartialType(
  CreateAssessmentInputDto,
) {}