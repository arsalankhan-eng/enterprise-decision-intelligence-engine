import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new project',
  })
  create(
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all projects',
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get project by ID',
  })
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update project',
  })
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete project',
  })
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.projectsService.remove(id);
  }
}