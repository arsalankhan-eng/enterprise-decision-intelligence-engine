import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExecutionsController } from './executions.controller';
import { ExecutionsService } from './executions.service';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';
import { AssessmentInput } from '../assessment-inputs/entities/assessment-input.entity';
import { Decision } from '../decisions/entities/decision.entity';

import { AgentsModule } from '../agents/agents.module';
import { DecisionEngineModule } from '../decision-engine/decision-engine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgentRun,
      AssessmentInput,
      Decision,
    ]),

    AgentsModule,

    DecisionEngineModule,
  ],

  controllers: [
    ExecutionsController,
  ],

  providers: [
    ExecutionsService,
  ],
})
export class ExecutionsModule {}