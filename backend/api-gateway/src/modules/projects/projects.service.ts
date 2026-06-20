import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Project } from './entities/project.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(
    dto: CreateProjectDto,
  ): Promise<Project> {
    const project = this.projectRepository.create(dto);

    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(
    id: string,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${id} not found`,
      );
    }

    return project;
  }

  async update(
    id: string,
    dto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);

    Object.assign(project, dto);

    return this.projectRepository.save(project);
  }

  async remove(
    id: string,
  ): Promise<void> {
    const project = await this.findOne(id);

    await this.projectRepository.remove(project);
  }
}