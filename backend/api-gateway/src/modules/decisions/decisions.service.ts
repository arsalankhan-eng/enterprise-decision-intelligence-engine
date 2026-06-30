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

@Injectable()
export class DecisionsService {
  constructor(
    @InjectRepository(Decision)
    private readonly decisionRepository: Repository<Decision>,
  ) {}

  async findAll() {
    return this.decisionRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(
    id: string,
  ) {
    const decision =
      await this.decisionRepository.findOne({
        where: {
          id,
        },
      });

    if (!decision) {
      throw new NotFoundException(
        `Decision ${id} not found`,
      );
    }

    return decision;
  }

  async findByAgentRun(
    agentRunId: string,
  ) {
    const decision =
      await this.decisionRepository.findOne({
        where: {
          agentRunId,
        },
      });

    if (!decision) {
      throw new NotFoundException(
        `Decision for Agent Run ${agentRunId} not found`,
      );
    }

    return decision;
  }
}