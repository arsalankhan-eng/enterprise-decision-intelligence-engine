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

import { AssessmentInput } from './entities/assessment-input.entity';
import { Assessment } from '../assessments/entities/assessment.entity';

import { CreateAssessmentInputDto } from './dto/create-assessment-input.dto';

@Injectable()
export class AssessmentInputsService {
  constructor(
    @InjectRepository(AssessmentInput)
    private readonly inputRepository: Repository<AssessmentInput>,

    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
  ) {}

  async create(
    assessmentId: string,
    dto: CreateAssessmentInputDto,
  ) {
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

    const input =
      this.inputRepository.create({
        ...dto,
        assessmentId,
      });

    return this.inputRepository.save(input);
  }

  async findAll() {
    return this.inputRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByAssessment(
    assessmentId: string,
  ) {
    return this.inputRepository.find({
      where: {
        assessmentId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}