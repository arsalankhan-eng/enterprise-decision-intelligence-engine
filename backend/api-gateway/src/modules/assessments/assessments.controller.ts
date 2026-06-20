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

import { AssessmentsService } from './assessments.service';

import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentsController {
  constructor(
    private readonly assessmentsService: AssessmentsService,
  ) {}

  @Post('/project/:projectId')
  @ApiOperation({
    summary:
      'Create assessment under a project',
  })
  createForProject(
    @Param(
      'projectId',
      ParseUUIDPipe,
    )
    projectId: string,

    @Body()
    dto: CreateAssessmentDto,
  ) {
    return this.assessmentsService.createForProject(
      projectId,
      dto,
    );
  }

  @Get()
  @ApiOperation({
    summary:
      'Get all assessments',
  })
  findAll() {
    return this.assessmentsService.findAll();
  }

  @Get('/project/:projectId')
  @ApiOperation({
    summary:
      'Get assessments by project',
  })
  findByProject(
    @Param(
      'projectId',
      ParseUUIDPipe,
    )
    projectId: string,
  ) {
    return this.assessmentsService.findByProject(
      projectId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Get assessment by ID',
  })
  findOne(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    id: string,
  ) {
    return this.assessmentsService.findOne(
      id,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Update assessment',
  })
  update(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    id: string,

    @Body()
    dto: UpdateAssessmentDto,
  ) {
    return this.assessmentsService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete assessment',
  })
  remove(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    id: string,
  ) {
    return this.assessmentsService.remove(
      id,
    );
  }
}