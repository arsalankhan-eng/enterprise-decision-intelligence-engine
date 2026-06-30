import { AgentAnalysis } from './agent-analysis.interface';

export interface DecisionContext {
  risk: AgentAnalysis;

  cost: AgentAnalysis;

  timeline: AgentAnalysis;

  compliance: AgentAnalysis;

  industry?: string;

  budget?: number;

  timelineMonths?: number;
}