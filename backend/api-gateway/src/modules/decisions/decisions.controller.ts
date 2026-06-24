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

import { DecisionsService } from './decisions.service';

import { CreateDecisionDto } from './dto/create-decision.dto';

@ApiTags('Decisions')
@Controller('decisions')
export class DecisionsController {
  constructor(
    private readonly decisionsService: DecisionsService,
  ) {}

  @Post('/agent-run/:agentRunId')
  @ApiOperation({
    summary:
      'Create decision for agent run',
  })
  create(
    @Param(
      'agentRunId',
      ParseUUIDPipe,
    )
    agentRunId: string,

    @Body()
    dto: CreateDecisionDto,
  ) {
    return this.decisionsService.create(
      agentRunId,
      dto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all decisions',
  })
  findAll() {
    return this.decisionsService.findAll();
  }

  @Get('/agent-run/:agentRunId')
  @ApiOperation({
    summary:
      'Get decisions by agent run',
  })
  findByAgentRun(
    @Param(
      'agentRunId',
      ParseUUIDPipe,
    )
    agentRunId: string,
  ) {
    return this.decisionsService.findByAgentRun(
      agentRunId,
    );
  }
}