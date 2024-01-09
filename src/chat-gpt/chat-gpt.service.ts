/* eslint-disable prettier/prettier */
// chat-gpt.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatGPTService {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = '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';

  async getChatGPTResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling ChatGPT API:', error.response?.data || error.message);
      throw error;
    }
  }
}
