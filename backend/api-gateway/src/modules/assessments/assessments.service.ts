import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Assessment } from './entities/assessment.entity';
import { Project } from '../projects/entities/project.entity';

import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createForProject(
    projectId: string,
    dto: CreateAssessmentDto,
  ): Promise<Assessment> {
    const project =
      await this.projectRepository.findOne({
        where: {
          id: projectId,
        },
      });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${projectId} not found`,
      );
    }

    const assessment =
      this.assessmentRepository.create({
        ...dto,
        projectId,
      });

    return this.assessmentRepository.save(
      assessment,
    );
  }

  async findAll(): Promise<Assessment[]> {
    return this.assessmentRepository.find({
      relations: {
        project: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByProject(
    projectId: string,
  ): Promise<Assessment[]> {
    return this.assessmentRepository.find({
      where: {
        projectId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(
    id: string,
  ): Promise<Assessment> {
    const assessment =
      await this.assessmentRepository.findOne({
        where: {
          id,
        },
        relations: {
          project: true,
        },
      });

    if (!assessment) {
      throw new NotFoundException(
        `Assessment with ID ${id} not found`,
      );
    }

    return assessment;
  }

  async update(
    id: string,
    dto: UpdateAssessmentDto,
  ): Promise<Assessment> {
    const assessment =
      await this.findOne(id);

    Object.assign(
      assessment,
      dto,
    );

    return this.assessmentRepository.save(
      assessment,
    );
  }

  async remove(
    id: string,
  ): Promise<void> {
    const assessment =
      await this.findOne(id);

    await this.assessmentRepository.remove(
      assessment,
    );
  }
}