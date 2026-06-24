import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentInput } from './entities/assessment-input.entity';

import { Assessment } from '../assessments/entities/assessment.entity';

import { AssessmentInputsController } from './assessment-inputs.controller';
import { AssessmentInputsService } from './assessment-inputs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssessmentInput,
      Assessment,
    ]),
  ],
  controllers: [AssessmentInputsController],
  providers: [AssessmentInputsService],
})
export class AssessmentInputsModule {}