import { Injectable } from '@nestjs/common';

import { AgentAnalysis } from '../interfaces/agent-analysis.interface';

@Injectable()
export class ConfidenceStrategy {
  calculate(
    analyses: AgentAnalysis[],
  ): number {
    if (!analyses.length) {
      return 0;
    }

    const totalScore = analyses.reduce(
      (sum, analysis) => sum + analysis.score,
      0,
    );

    return Math.round(
      totalScore / analyses.length,
    );
  }
}