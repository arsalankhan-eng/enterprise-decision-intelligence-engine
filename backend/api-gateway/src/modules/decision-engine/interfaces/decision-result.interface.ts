import { DecisionPriority } from '../enums/decision-priority.enum';

export interface DecisionResult {
  title: string;
  summary: string;
  recommendation: string;
  confidenceScore: number;
  priority: DecisionPriority;
  businessImpact: string;
}