import { Module } from '@nestjs/common';
import { AgentRunsController } from './agent-runs.controller';
import { AgentRunsService } from './agent-runs.service';
import { Assessment } from '../assessments/entities/assessment.entity';
import { AgentRun } from './entities/agent-run.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
      TypeOrmModule.forFeature([
        Assessment,
        AgentRun,
      ]),
    ],
  controllers: [AgentRunsController],
  providers: [AgentRunsService]
})
export class AgentRunsModule {}
