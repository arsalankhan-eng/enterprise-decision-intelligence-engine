import { Injectable } from '@nestjs/common';

import { DecisionContext } from '../interfaces/decision-context.interface';

@Injectable()
export class RecommendationBuilder {
  build(
    context: DecisionContext,
  ): string {
    const {
      risk,
      cost,
      timeline,
      compliance,
    } = context;

    const recommendations: string[] = [];

    /**
     * Risk
     */
    if (risk.score >= 80) {
      recommendations.push(
        'Proceed with implementation while continuously monitoring identified risks.',
      );
    } else if (risk.score >= 60) {
      recommendations.push(
        'Reduce project risks before entering the execution phase.',
      );
    } else {
      recommendations.push(
        'Project risk is high. Perform an additional risk assessment before approval.',
      );
    }

    /**
     * Cost
     */
    if (cost.score < 60) {
      recommendations.push(
        'Review budget allocation and identify cost optimization opportunities.',
      );
    }

    /**
     * Timeline
     */
    if (timeline.score < 70) {
      recommendations.push(
        'Revisit the project schedule and allocate additional resources to reduce delivery risk.',
      );
    }

    /**
     * Compliance
     */
    if (compliance.score < 75) {
      recommendations.push(
        'Resolve compliance gaps before moving into production execution.',
      );
    }

    /**
     * Final Recommendation
     */
    recommendations.push(
      'Establish governance checkpoints and continuously monitor project KPIs throughout execution.',
    );

    return recommendations.join('\n\n');
  }
}