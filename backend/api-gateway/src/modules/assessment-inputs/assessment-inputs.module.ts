import { Module } from '@nestjs/common';
import { AssessmentInputsController } from './assessment-inputs.controller';

@Module({
  controllers: [AssessmentInputsController]
})
export class AssessmentInputsModule {}
