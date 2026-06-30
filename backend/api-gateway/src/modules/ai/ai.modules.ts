import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { DeepSeekProvider } from './providers/deepseek.provider';

@Module({
  imports: [
    HttpModule,
  ],

  providers: [
    DeepSeekProvider,
  ],

  exports: [
    DeepSeekProvider,
  ],
})
export class AiModule {}