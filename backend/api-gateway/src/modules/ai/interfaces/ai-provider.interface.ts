export interface AIAnalysisResult {
  score: number;

  reasoning: string;
}

export interface AIProvider {
  analyze(
    prompt: string,
  ): Promise<AIAnalysisResult>;
}