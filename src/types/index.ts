export type ChatMode = 'manual' | 'auto';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export type MessageStatus = 'pending' | 'sent' | 'rejected' | 'error';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status: MessageStatus;
}

export interface AppConfig {
  openaiApiKey: string;
  openaiModel: 'gpt-4' | 'gpt-3.5-turbo';
  chatStyle: string;
  temperature: number;
  maxTokens: number;
  autoScroll: boolean;
  showTimestamps: boolean;
  playSound: boolean;
}

export interface AppState {
  // Connection
  chatUrl: string;
  connectionStatus: ConnectionStatus;

  // Mode
  chatMode: ChatMode;
  isRunning: boolean;

  // Messages
  messages: Message[];
  pendingMessage: Message | null;

  // Config
  config: AppConfig;

  // Stats
  stats: {
    totalMessages: number;
    messagesSent: number;
    pendingApproval: number;
  };
}

export interface MCPService {
  connect: (url: string) => Promise<void>;
  disconnect: () => Promise<void>;
  readMessages: () => Promise<string[]>;
  sendMessage: (message: string) => Promise<void>;
  isConnected: () => boolean;
}

export interface OpenAIService {
  generateResponse: (messages: Message[], systemPrompt: string) => Promise<string>;
  setApiKey: (apiKey: string) => void;
  setModel: (model: string) => void;
}
