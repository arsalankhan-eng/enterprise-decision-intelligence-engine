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

import { Decision } from './entities/decision.entity';
import { AgentRun } from '../agent-runs/entities/agent-run.entity';

import { CreateDecisionDto } from './dto/create-decision.dto';

@Injectable()
export class DecisionsService {
  constructor(
    @InjectRepository(Decision)
    private readonly decisionRepository: Repository<Decision>,

    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,
  ) {}

  async create(
    agentRunId: string,
    dto: CreateDecisionDto,
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
      this.decisionRepository.create({
        ...dto,
        agentRunId,
      });

    return this.decisionRepository.save(
      decision,
    );
  }

  async findAll() {
    return this.decisionRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByAgentRun(
    agentRunId: string,
  ) {
    return this.decisionRepository.find({
      where: {
        agentRunId,
      },
    });
  }
}