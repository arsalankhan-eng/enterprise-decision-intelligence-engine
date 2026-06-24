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

import { AgentRun } from './entities/agent-run.entity';

import { Assessment } from '../assessments/entities/assessment.entity';

import { CreateAgentRunDto } from './dto/create-agent-run.dto';

import { AgentRunStatus } from './enums/agent-run-status.enum';

@Injectable()
export class AgentRunsService {
  constructor(
    @InjectRepository(AgentRun)
    private readonly agentRunRepository: Repository<AgentRun>,

    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
  ) {}

  async executeAssessment(
    assessmentId: string,
    dto: CreateAgentRunDto,
  ): Promise<AgentRun> {
    const assessment =
      await this.assessmentRepository.findOne({
        where: {
          id: assessmentId,
        },
      });

    if (!assessment) {
      throw new NotFoundException(
        `Assessment ${assessmentId} not found`,
      );
    }

    const agentRun =
      this.agentRunRepository.create({
        assessmentId,
        status: AgentRunStatus.PENDING,
        modelUsed:
          dto.modelUsed ?? 'llama3',
      });

    return this.agentRunRepository.save(
      agentRun,
    );
  }

  async findAll(): Promise<AgentRun[]> {
    return this.agentRunRepository.find({
      relations: {
        assessment: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(
    id: string,
  ): Promise<AgentRun> {
    const agentRun =
      await this.agentRunRepository.findOne({
        where: {
          id,
        },
        relations: {
          assessment: true,
        },
      });

    if (!agentRun) {
      throw new NotFoundException(
        `Agent Run ${id} not found`,
      );
    }

    return agentRun;
  }

  async findByAssessment(
    assessmentId: string,
  ): Promise<AgentRun[]> {
    return this.agentRunRepository.find({
      where: {
        assessmentId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}