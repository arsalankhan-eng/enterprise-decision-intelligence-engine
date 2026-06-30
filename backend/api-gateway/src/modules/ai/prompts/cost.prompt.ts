import { AssessmentInput } from '../../assessment-inputs/entities/assessment-input.entity';

export function buildCostPrompt(
  inputs: AssessmentInput[],
): string {
  return `
You are an Enterprise Cost Optimization AI for an Enterprise Decision Intelligence Engine.

Your task is to analyze the project assessment inputs and evaluate the overall financial feasibility of the project.

Assessment Inputs:

${JSON.stringify(inputs, null, 2)}

Instructions:

1. Analyze all assessment inputs.
2. Consider project budget, financial constraints, project objectives and business risks.
3. Generate a cost score between 0 and 100.
4. Explain the primary financial reasoning behind the score.
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