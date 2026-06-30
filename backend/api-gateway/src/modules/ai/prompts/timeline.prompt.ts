import { AssessmentInput } from '../../assessment-inputs/entities/assessment-input.entity';

export function buildTimelinePrompt(
  inputs: AssessmentInput[],
): string {
  return `
You are an Enterprise Timeline Analysis AI for an Enterprise Decision Intelligence Engine.

Your task is to analyze the project assessment inputs and evaluate the likelihood of completing the project on schedule.

Assessment Inputs:

${JSON.stringify(inputs, null, 2)}

Instructions:

1. Analyze every assessment input.
2. Consider timelines, project objectives, dependencies, technical complexity and identified risks.
3. Generate a timeline score between 0 and 100.
4. Explain the primary reasons affecting the project schedule.
5. Respond ONLY with valid JSON.
6. Do NOT use markdown.
7. Do NOT wrap the response inside \`\`\`.
8. Do NOT include explanations outside the JSON.
9. The response MUST be valid JSON.

Required JSON format:

{
  "score": 85,
  "reasoning": "Short professional explanation."
}
`;
}