import OpenAI from 'openai';
import type { OpenAIService, Message } from '../types';

class OpenAIServiceImpl implements OpenAIService {
  private client: OpenAI | null = null;
  private model = 'gpt-4';

  setApiKey(apiKey: string): void {
    if (!apiKey) {
      console.error('[OpenAI] API key is empty');
      return;
    }

    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Note: In production, API calls should go through backend
    });

    console.log('[OpenAI] API key configured');
  }

  setModel(model: string): void {
    this.model = model;
    console.log(`[OpenAI] Model set to ${model}`);
  }

  async generateResponse(messages: Message[], systemPrompt: string): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized. Please set API key first.');
    }

    console.log('[OpenAI] Generating response...');

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((msg) => ({
            role: msg.role === 'ai' ? 'assistant' as const : 'user' as const,
            content: msg.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content || '';
      console.log('[OpenAI] Response generated:', response.substring(0, 50) + '...');

      return response;
    } catch (error) {
      console.error('[OpenAI] Error generating response:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to generate response'
      );
    }
  }

  // Mock response for testing without API key
  async generateMockResponse(messages: Message[]): Promise<string> {
    console.log('[OpenAI] Generating mock response (no API key)...');

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) {
      return 'Xin chào! Tôi có thể giúp gì cho bạn?';
    }

    // Simple mock responses
    const mockResponses = [
      'Cảm ơn bạn đã liên hệ! Tôi đã ghi nhận yêu cầu của bạn.',
      'Vâng, tôi hiểu. Để tôi kiểm tra thông tin cho bạn.',
      'Đây là câu trả lời cho câu hỏi của bạn.',
      'Tôi sẽ hỗ trợ bạn ngay bây giờ.',
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        const response = mockResponses[Math.floor(Math.random() * mockResponses.length)] || 'Xin chào!';
        resolve(response);
      }, 1000);
    });
  }
}

export const openaiService = new OpenAIServiceImpl();
