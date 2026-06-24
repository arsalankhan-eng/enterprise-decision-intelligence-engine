import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';
import { Assessment } from '../assessments/entities/assessment.entity';
import { AssessmentInput } from '../assessment-inputs/entities/assessment-input.entity';
import { Decision } from '../decisions/entities/decision.entity';

import { ExecutionsController } from './executions.controller';
import { ExecutionsService } from './executions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgentRun,
      Assessment,
      AssessmentInput,
      Decision,
    ]),
  ],
  controllers: [ExecutionsController],
  providers: [ExecutionsService],
})
export class ExecutionsModule {}