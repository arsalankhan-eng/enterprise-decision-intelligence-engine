import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ExecutionsService } from './executions.service';

@ApiTags('Executions')
@Controller('executions')
export class ExecutionsController {
  constructor(
    private readonly executionsService: ExecutionsService,
  ) {}

  @Post('/agent-run/:agentRunId')
  @ApiOperation({
    summary: 'Execute assessment workflow',
  })
  execute(
    @Param(
      'agentRunId',
      ParseUUIDPipe,
    )
    agentRunId: string,
  ) {
    return this.executionsService.execute(
      agentRunId,
    );
  }
}