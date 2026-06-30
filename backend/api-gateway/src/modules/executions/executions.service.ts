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

import { RiskAgentService } from '../agents/risk-agent.service';
import { CostAgentService } from '../agents/cost-agent.service';
import { TimelineAgentService } from '../agents/timeline-agent.service';
import { ComplianceAgentService } from '../agents/compliance-agent.service';

import { DecisionEngineService } from '../decision-engine/decision-engine.service';

@Injectable()
export class ExecutionsService {
  constructor(
    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,

    @InjectRepository(AssessmentInput)
    private readonly inputRepository: Repository<AssessmentInput>,

    @InjectRepository(Decision)
    private readonly decisionRepository: Repository<Decision>,

    private readonly riskAgent: RiskAgentService,

    private readonly costAgent: CostAgentService,

    private readonly timelineAgent: TimelineAgentService,

    private readonly complianceAgent: ComplianceAgentService,

    private readonly decisionEngine: DecisionEngineService,
  ) {}

  async execute(
    agentRunId: string,
  ) {
    /**
     * Find Agent Run
     */

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

    /**
     * Mark Running
     */

    agentRun.status =
      AgentRunStatus.RUNNING;

    await this.agentRunRepository.save(
      agentRun,
    );

    /**
     * Load Assessment Inputs
     */

    const inputs =
      await this.inputRepository.find({
        where: {
          assessmentId:
            agentRun.assessmentId,
        },
      });

    /**
     * Execute AI Agents
     */

    const risk =
      await this.riskAgent.analyze(inputs);

    const cost =
      await this.costAgent.analyze(inputs);

    const timeline =
      await this.timelineAgent.analyze(
        inputs,
      );

    const compliance =
      await this.complianceAgent.analyze(
        inputs,
      );

    /**
     * Generate Enterprise Decision
     */

    const decisionResult =
      this.decisionEngine.generateDecision({
        risk,
        cost,
        timeline,
        compliance,

        industry:
          agentRun.assessment.industry,

        budget:
          Number(
            agentRun.assessment.budget,
          ),

        timelineMonths:
          agentRun.assessment.timelineMonths,
      });

    /**
     * Persist Decision
     */

    // const decision =
    //   this.decisionRepository.create({
    //     agentRunId: agentRun.id,

    //     title:
    //       decisionResult.title,

    //     summary:
    //       decisionResult.summary,

    //     recommendation:
    //       decisionResult.recommendation,

    //     confidenceScore:
    //       decisionResult.confidenceScore,
    //   });
const decision =
  this.decisionRepository.create({
    agentRunId: agentRun.id,

    title:
      decisionResult.title,

    summary:
      decisionResult.summary,

    recommendation:
      decisionResult.recommendation,

    confidenceScore:
      decisionResult.confidenceScore,

    priority:
      decisionResult.priority,

    businessImpact:
      decisionResult.businessImpact,
  });
    await this.decisionRepository.save(
      decision,
    );

    /**
     * Mark Completed
     */

    agentRun.status =
      AgentRunStatus.COMPLETED;

    await this.agentRunRepository.save(
      agentRun,
    );

    /**
     * Return Response
     */

    return {
      success: true,

      agentRunId,

      scores: {
        risk: risk.score,
        cost: cost.score,
        timeline:
          timeline.score,
        compliance:
          compliance.score,
      },

      decision,
    };
  }

async getExecutionHistory() {
  const agentRuns =
    await this.agentRunRepository.find({
      relations: {
        assessment: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

  const history: any[] = [];

  for (const run of agentRuns) {
    const decision =
      await this.decisionRepository.findOne({
        where: {
          agentRunId: run.id,
        },
      });

    history.push({
      agentRunId: run.id,

      projectName:
        run.assessment.title,

      industry:
        run.assessment.industry,

      status:
        run.status,

      confidenceScore:
        decision?.confidenceScore ?? null,

      priority:
        decision?.priority ?? null,

      createdAt:
        run.createdAt,
    });
  }

  return history;
}



async getDashboardStatistics() {
  const totalExecutions =
    await this.agentRunRepository.count();

  const completedExecutions =
    await this.agentRunRepository.count({
      where: {
        status: AgentRunStatus.COMPLETED,
      },
    });

  const runningExecutions =
    await this.agentRunRepository.count({
      where: {
        status: AgentRunStatus.RUNNING,
      },
    });

  const totalAssessments =
    await this.inputRepository.manager.count(
      'Assessment',
    );

  const totalProjects =
    await this.inputRepository.manager.count(
      'Project',
    );

  const decisions =
    await this.decisionRepository.find();

  const averageConfidence =
    decisions.length === 0
      ? 0
      : Math.round(
          decisions.reduce(
            (sum, decision) =>
              sum +
              (decision.confidenceScore ?? 0),
            0,
          ) / decisions.length,
        );

  const highPriorityDecisions =
    decisions.filter(
      (decision) =>
        decision.priority === 'HIGH' ||
        decision.priority === 'CRITICAL',
    ).length;

  return {
    totalProjects,

    totalAssessments,

    totalExecutions,

    completedExecutions,

    runningExecutions,

    averageConfidence,

    highPriorityDecisions,
  };
}





async getExecutionTimeline(
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

  const decision =
    await this.decisionRepository.findOne({
      where: {
        agentRunId,
      },
    });

  return [
    {
      step: 'Assessment Created',
      status: 'COMPLETED',
      timestamp:
        agentRun.assessment.createdAt,
    },
    {
      step: 'Execution Started',
      status:
        agentRun.status ===
        AgentRunStatus.RUNNING
          ? 'IN_PROGRESS'
          : 'COMPLETED',
      timestamp:
        agentRun.createdAt,
    },
    {
      step: 'Risk Agent',
      status:
        decision
          ? 'COMPLETED'
          : 'PENDING',
    },
    {
      step: 'Cost Agent',
      status:
        decision
          ? 'COMPLETED'
          : 'PENDING',
    },
    {
      step: 'Timeline Agent',
      status:
        decision
          ? 'COMPLETED'
          : 'PENDING',
    },
    {
      step: 'Compliance Agent',
      status:
        decision
          ? 'COMPLETED'
          : 'PENDING',
    },
    {
      step: 'Decision Generated',
      status:
        decision
          ? 'COMPLETED'
          : 'PENDING',
      timestamp:
        decision?.createdAt,
    },
  ];
}


async getExplainability(
  agentRunId: string,
) {
  const run =
    await this.agentRunRepository.findOne({
      where: {
        id: agentRunId,
      },
    });

  if (!run) {
    throw new NotFoundException(
      `Agent Run ${agentRunId} not found`,
    );
  }

  const decision =
    await this.decisionRepository.findOne({
      where: {
        agentRunId,
      },
    });

  if (!decision) {
    throw new NotFoundException(
      'Decision not found.',
    );
  }

  return {
    confidenceScore:
      decision.confidenceScore,

    priority:
      decision.priority,

    businessImpact:
      decision.businessImpact,

    recommendation:
      decision.recommendation,

    agents: [
      {
        agent: 'Risk Agent',
        explanation:
          'Analyzed project risks, legacy dependencies and technical challenges.',
      },
      {
        agent: 'Cost Agent',
        explanation:
          'Evaluated budget utilization and financial feasibility.',
      },
      {
        agent: 'Timeline Agent',
        explanation:
          'Estimated schedule feasibility and delivery risks.',
      },
      {
        agent: 'Compliance Agent',
        explanation:
          'Verified governance, regulatory and security compliance.',
      },
    ],
  };
}

}