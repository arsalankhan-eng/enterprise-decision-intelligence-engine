import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessImpactBuilder {
  build(
    confidenceScore: number,
  ): string {
    if (confidenceScore >= 90) {
      return 'Very High Business Impact. Immediate execution is strongly recommended.';
    }

    if (confidenceScore >= 80) {
      return 'High Business Impact. Proceed with controlled execution and governance.';
    }

    if (confidenceScore >= 60) {
      return 'Moderate Business Impact. Address identified issues before full implementation.';
    }

    return 'Low Business Impact. Significant improvements are recommended before project approval.';
  }
}