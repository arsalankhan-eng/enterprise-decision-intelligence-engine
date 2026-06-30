import {
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

  @Get()
@ApiOperation({
  summary: 'Get execution history',
})
getExecutionHistory() {
  return this.executionsService.getExecutionHistory();
}



@Get('/dashboard')
@ApiOperation({
  summary: 'Dashboard Statistics',
})
getDashboardStatistics() {
  return this.executionsService.getDashboardStatistics();
}


@Get('/timeline/:agentRunId')
getExecutionTimeline(
  @Param(
    'agentRunId',
    ParseUUIDPipe,
  )
  agentRunId: string,
) {
  return this.executionsService.getExecutionTimeline(
    agentRunId,
  );
}


@Get('/explainability/:agentRunId')
getExplainability(
  @Param(
    'agentRunId',
    ParseUUIDPipe,
  )
  agentRunId: string,
) {
  return this.executionsService.getExplainability(
    agentRunId,
  );
}
}