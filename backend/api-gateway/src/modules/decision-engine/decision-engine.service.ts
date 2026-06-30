import { Injectable } from '@nestjs/common';

import { ExecutiveSummaryBuilder } from './builders/executive-summary.builder';
import { RecommendationBuilder } from './builders/recommendation.builder';
import { BusinessImpactBuilder } from './builders/business-impact.builder';

import { ConfidenceStrategy } from './strategies/confidence.strategy';
import { PriorityStrategy } from './strategies/priority.strategy';

import { DecisionContext } from './interfaces/decision-context.interface';
import { DecisionResult } from './interfaces/decision-result.interface';

@Injectable()
export class DecisionEngineService {
  constructor(
    private readonly executiveSummaryBuilder: ExecutiveSummaryBuilder,

    private readonly recommendationBuilder: RecommendationBuilder,

    private readonly businessImpactBuilder: BusinessImpactBuilder,

    private readonly confidenceStrategy: ConfidenceStrategy,

    private readonly priorityStrategy: PriorityStrategy,
  ) {}

  generateDecision(
    context: DecisionContext,
  ): DecisionResult {
    /**
     * Collect all agent analyses
     */
    const analyses = [
      context.risk,
      context.cost,
      context.timeline,
      context.compliance,
    ];

    /**
     * Calculate overall confidence
     */
    const confidenceScore =
      this.confidenceStrategy.calculate(
        analyses,
      );

    /**
     * Determine business priority
     */
    const priority =
      this.priorityStrategy.calculate(
        confidenceScore,
      );

    /**
     * Build executive summary
     */
    const summary =
      this.executiveSummaryBuilder.build(
        context,
      );

    /**
     * Build recommendation
     */
    const recommendation =
      this.recommendationBuilder.build(
        context,
      );

    /**
     * Build business impact
     */
    const businessImpact =
      this.businessImpactBuilder.build(
        confidenceScore,
      );

    /**
     * Return final decision object
     */
    return {
      title:
        'Enterprise Decision Intelligence Report',

      summary,

      recommendation,

      confidenceScore,

      priority,

      businessImpact,
    };
  }
}