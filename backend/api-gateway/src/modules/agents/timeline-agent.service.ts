import { Injectable } from '@nestjs/common';

import { AssessmentInput } from '../assessment-inputs/entities/assessment-input.entity';

import { AgentResult } from './interfaces/agent-result.interface';

import { DeepSeekProvider } from '../ai/providers/deepseek.provider';

import { buildTimelinePrompt } from '../ai/prompts/timeline.prompt';

@Injectable()
export class TimelineAgentService {
  constructor(
    private readonly aiProvider: DeepSeekProvider,
  ) {}

  async analyze(
    inputs: AssessmentInput[],
  ): Promise<AgentResult> {
    const prompt =
      buildTimelinePrompt(inputs);

    const result =
      await this.aiProvider.analyze(
        prompt,
      );

    return {
      score: result.score,

      reasoning:
        result.reasoning,
    };
  }
}