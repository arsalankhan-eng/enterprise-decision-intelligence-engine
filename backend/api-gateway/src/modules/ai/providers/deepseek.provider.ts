import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

import {
  AIAnalysisResult,
  AIProvider,
} from '../interfaces/ai-provider.interface';

@Injectable()
export class DeepSeekProvider implements AIProvider {
  constructor(
    private readonly http: HttpService,
  ) {}

  async analyze(
    prompt: string,
  ): Promise<AIAnalysisResult> {
    try {
      const response =
        await firstValueFrom(
          this.http.post(
            'http://localhost:11434/api/chat',
            {
              model: 'llama3.2',

              messages: [
                {
                  role: 'user',
                  content: prompt,
                },
              ],

              /**
               * Force JSON output
               */
              format: 'json',

              stream: false,

              options: {
                temperature: 0,
                num_predict: 512,
              },
            },
          ),
        );

      const content =
        response.data.message.content;

      console.log('\n====================================');
      console.log('RAW OLLAMA RESPONSE');
      console.log('====================================');
      console.log(content);
      console.log('====================================\n');

      const parsed = JSON.parse(content);

      console.log(
        'Parsed Object:',
        parsed,
      );

      const score = Number(
        parsed.score,
      );

      if (isNaN(score)) {
        throw new Error(
          `Invalid score returned: ${parsed.score}`,
        );
      }

      return {
        score,

        reasoning:
          parsed.reasoning ??
          'No reasoning provided.',
      };
    } catch (error) {
      console.error(
        '\n========= OLLAMA ERROR =========',
      );

      console.error(error);

      console.error(
        '===============================\n',
      );

      throw new InternalServerErrorException(
        'Ollama analysis failed.',
      );
    }
  }
}