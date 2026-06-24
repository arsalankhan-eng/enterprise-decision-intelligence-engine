import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Decision } from './entities/decision.entity';
import { AgentRun } from '../agent-runs/entities/agent-run.entity';

import { DecisionsController } from './decisions.controller';
import { DecisionsService } from './decisions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Decision,
      AgentRun,
    ]),
  ],
  controllers: [DecisionsController],
  providers: [DecisionsService],
})
export class DecisionsModule {}