import { Injectable } from '@nestjs/common';

import { DecisionContext } from '../interfaces/decision-context.interface';

@Injectable()
export class ExecutiveSummaryBuilder {
  build(
    context: DecisionContext,
  ): string {
    const {
      risk,
      cost,
      timeline,
      compliance,
    } = context;

    return `
===============================
EXECUTIVE DECISION SUMMARY
===============================

RISK ANALYSIS
--------------
Score: ${risk.score}

${risk.reasoning}


COST ANALYSIS
--------------
Score: ${cost.score}

${cost.reasoning}


TIMELINE ANALYSIS
-----------------
Score: ${timeline.score}

${timeline.reasoning}


COMPLIANCE ANALYSIS
-------------------
Score: ${compliance.score}

${compliance.reasoning}
`;
  }
}