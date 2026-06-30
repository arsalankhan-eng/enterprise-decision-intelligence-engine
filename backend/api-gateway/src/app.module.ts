import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './modules/health/health.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { AssessmentInputsModule } from './modules/assessment-inputs/assessment-inputs.module';
import { AgentRunsModule } from './modules/agent-runs/agent-runs.module';
import { DecisionsModule } from './modules/decisions/decisions.module';
import { ExecutionsModule } from './modules/executions/executions.module';
import { AgentsModule } from './modules/agents/agents.module';
import { DecisionEngineModule } from './modules/decision-engine/decision-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      autoLoadEntities: true,
      synchronize: true,
    }),

    HealthModule,

    ProjectsModule,

    AssessmentsModule,

    AssessmentInputsModule,

    AgentRunsModule,

    DecisionsModule,

    ExecutionsModule,

    AgentsModule,

    DecisionEngineModule,
  ],
})
export class AppModule {}