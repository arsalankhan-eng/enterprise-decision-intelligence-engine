import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AgentRunsService } from './agent-runs.service';

import { CreateAgentRunDto } from './dto/create-agent-run.dto';

@ApiTags('Agent Runs')
@Controller('agent-runs')
export class AgentRunsController {
  constructor(
    private readonly agentRunsService: AgentRunsService,
  ) {}

  @Post('/assessment/:assessmentId')
  @ApiOperation({
    summary:
      'Execute assessment analysis',
  })
  executeAssessment(
    @Param(
      'assessmentId',
      ParseUUIDPipe,
    )
    assessmentId: string,

    @Body()
    dto: CreateAgentRunDto,
  ) {
    return this.agentRunsService.executeAssessment(
      assessmentId,
      dto,
    );
  }

  @Get()
  @ApiOperation({
    summary:
      'Get all agent runs',
  })
  findAll() {
    return this.agentRunsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Get agent run by ID',
  })
  findOne(
    @Param(
      'id',
      ParseUUIDPipe,
    )
    id: string,
  ) {
    return this.agentRunsService.findOne(
      id,
    );
  }

  @Get('/assessment/:assessmentId')
  @ApiOperation({
    summary:
      'Get runs by assessment',
  })
  findByAssessment(
    @Param(
      'assessmentId',
      ParseUUIDPipe,
    )
    assessmentId: string,
  ) {
    return this.agentRunsService.findByAssessment(
      assessmentId,
    );
  }
}