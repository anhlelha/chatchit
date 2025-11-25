import { create } from 'zustand';
import type { AppState, ChatMode, ConnectionStatus, Message, AppConfig } from '../types';

interface AppStore extends AppState {
  // Actions
  setChatUrl: (url: string) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setChatMode: (mode: ChatMode) => void;
  setIsRunning: (running: boolean) => void;
  addMessage: (message: Message) => void;
  setPendingMessage: (message: Message | null) => void;
  updateMessageStatus: (messageId: string, status: Message['status']) => void;
  clearMessages: () => void;
  updateConfig: (config: Partial<AppConfig>) => void;
  updateStats: () => void;
}

const defaultConfig: AppConfig = {
  openaiApiKey: '',
  openaiModel: 'gpt-4',
  chatStyle: 'Bạn là một trợ lý thân thiện và chuyên nghiệp. Trả lời ngắn gọn, lịch sự và hữu ích.',
  temperature: 0.7,
  maxTokens: 500,
  autoScroll: true,
  showTimestamps: true,
  playSound: false,
};

export const useAppStore = create<AppStore>((set) => ({
  // Initial State
  chatUrl: '',
  connectionStatus: 'disconnected',
  chatMode: 'manual',
  isRunning: false,
  messages: [],
  pendingMessage: null,
  config: defaultConfig,
  stats: {
    totalMessages: 0,
    messagesSent: 0,
    pendingApproval: 0,
  },

  // Actions
  setChatUrl: (url) => set({ chatUrl: url }),

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  setChatMode: (mode) => set({ chatMode: mode }),

  setIsRunning: (running) => set({ isRunning: running }),

  addMessage: (message) =>
    set((state) => {
      const newMessages = [...state.messages, message];
      return {
        messages: newMessages,
        stats: {
          ...state.stats,
          totalMessages: newMessages.length,
        }
      };
    }),

  setPendingMessage: (message) =>
    set((state) => ({
      pendingMessage: message,
      stats: {
        ...state.stats,
        pendingApproval: message ? 1 : 0,
      },
    })),

  updateMessageStatus: (messageId, status) =>
    set((state) => {
      const newMessages = state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, status } : msg
      );
      const messagesSent = newMessages.filter((msg) => msg.status === 'sent' && msg.role === 'ai').length;
      return {
        messages: newMessages,
        stats: {
          ...state.stats,
          messagesSent,
        },
      };
    }),

  clearMessages: () =>
    set({
      messages: [],
      pendingMessage: null,
      stats: {
        totalMessages: 0,
        messagesSent: 0,
        pendingApproval: 0,
      },
    }),

  updateConfig: (config) =>
    set((state) => ({
      config: { ...state.config, ...config },
    })),

  updateStats: () =>
    set((state) => {
      const messagesSent = state.messages.filter(
        (msg) => msg.status === 'sent' && msg.role === 'ai'
      ).length;
      return {
        stats: {
          totalMessages: state.messages.length,
          messagesSent,
          pendingApproval: state.pendingMessage ? 1 : 0,
        },
      };
    }),
}));
