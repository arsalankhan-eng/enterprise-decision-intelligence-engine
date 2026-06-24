import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';
import { AssessmentInput } from '../assessment-inputs/entities/assessment-input.entity';
import { Decision } from '../decisions/entities/decision.entity';

import { AgentRunStatus } from '../agent-runs/enums/agent-run-status.enum';

@Injectable()
export class ExecutionsService {
  constructor(
    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,

    @InjectRepository(AssessmentInput)
    private readonly inputRepository: Repository<AssessmentInput>,

    @InjectRepository(Decision)
    private readonly decisionRepository: Repository<Decision>,
  ) {}

  async execute(
    agentRunId: string,
  ) {
    const agentRun =
      await this.agentRunRepository.findOne({
        where: {
          id: agentRunId,
        },
        relations: {
          assessment: true,
        },
      });

    if (!agentRun) {
      throw new NotFoundException(
        `Agent Run ${agentRunId} not found`,
      );
    }

    agentRun.status =
      AgentRunStatus.RUNNING;

    await this.agentRunRepository.save(
      agentRun,
    );

    const inputs =
      await this.inputRepository.find({
        where: {
          assessmentId:
            agentRun.assessmentId,
        },
      });

    // Fake AI Analysis (V1)

    const riskScore = 78;
    const costScore = 82;
    const timelineScore = 70;
    const complianceScore = 90;

    const confidenceScore =
      Math.round(
        (
          riskScore +
          costScore +
          timelineScore +
          complianceScore
        ) / 4,
      );

    const decision =
      this.decisionRepository.create({
        agentRunId: agentRun.id,

        title:
          'AI Strategic Recommendation',

        summary:
          `Analysis completed using ${inputs.length} assessment inputs.`,

        recommendation:
          'Proceed with phased execution strategy.',

        confidenceScore,
      });

    await this.decisionRepository.save(
      decision,
    );

    agentRun.status =
      AgentRunStatus.COMPLETED;

    await this.agentRunRepository.save(
      agentRun,
    );

    return {
      success: true,

      agentRunId,

      scores: {
        riskScore,
        costScore,
        timelineScore,
        complianceScore,
      },

      confidenceScore,

      decision,
    };
  }
}