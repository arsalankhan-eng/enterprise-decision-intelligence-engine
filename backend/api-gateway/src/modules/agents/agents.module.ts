import { Module } from '@nestjs/common';

import { RiskAgentService } from './risk-agent.service';
import { CostAgentService } from './cost-agent.service';
import { TimelineAgentService } from './timeline-agent.service';
import { ComplianceAgentService } from './compliance-agent.service';
import { AiModule } from '../ai/ai.modules';

@Module({
  imports: [
  AiModule,
],
  providers: [
    RiskAgentService,
    CostAgentService,
    TimelineAgentService,
    ComplianceAgentService,
  ],
  exports: [
    RiskAgentService,
    CostAgentService,
    TimelineAgentService,
    ComplianceAgentService,
  ],
})
export class AgentsModule {}