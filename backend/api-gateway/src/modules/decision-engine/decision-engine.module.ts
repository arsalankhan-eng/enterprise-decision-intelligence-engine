import { Module, Global } from '@nestjs/common';

import { DecisionEngineService } from './decision-engine.service';

import { ExecutiveSummaryBuilder } from './builders/executive-summary.builder';
import { RecommendationBuilder } from './builders/recommendation.builder';
import { BusinessImpactBuilder } from './builders/business-impact.builder';

import { ConfidenceStrategy } from './strategies/confidence.strategy';
import { PriorityStrategy } from './strategies/priority.strategy';

@Global()
@Module({
  providers: [
    DecisionEngineService,

    ExecutiveSummaryBuilder,
    RecommendationBuilder,
    BusinessImpactBuilder,

    ConfidenceStrategy,
    PriorityStrategy,
  ],

  exports: [
    DecisionEngineService,
  ],
})
export class DecisionEngineModule {}