import { Injectable } from '@nestjs/common';
import { DecisionPriority } from '../enums/decision-priority.enum';

@Injectable()
export class PriorityStrategy {
  calculate(
    confidenceScore: number,
  ): DecisionPriority {
    if (confidenceScore >= 90) {
      return DecisionPriority.CRITICAL;
    }

    if (confidenceScore >= 80) {
      return DecisionPriority.HIGH;
    }

    if (confidenceScore >= 60) {
      return DecisionPriority.MEDIUM;
    }

    return DecisionPriority.LOW;
  }
}