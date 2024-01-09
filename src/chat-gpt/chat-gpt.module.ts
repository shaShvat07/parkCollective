/* eslint-disable prettier/prettier */
// chat-gpt.module.ts
import { Module } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';

@Module({
  providers: [ChatGPTService],
  exports: [ChatGPTService],
})
export class ChatGPTModule {}
