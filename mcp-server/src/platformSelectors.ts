export interface PlatformSelectors {
  name: string;
  urlPattern: RegExp;
  selectors: {
    messageList: string;
    messageItem: string;
    messageContent: string;
    messageAuthor?: string;
    messageTime?: string;
    inputField: string;
    sendButton: string;
    userMessage?: string;
    contactMessage?: string;
  };
  waitForSelector: string;
  sendDelay?: number;
}

export const PLATFORM_SELECTORS: Record<string, PlatformSelectors> = {
  zalo: {
    name: 'Zalo',
    urlPattern: /chat\.zalo\.me/i,
    selectors: {
      messageList: '.message-list, [class*="conversation"]',
      messageItem: '.message-item, [class*="message"]',
      messageContent: '.message-content, [class*="text"]',
      inputField: 'textarea, [contenteditable="true"]',
      sendButton: 'button[aria-label*="G\u1eedi"], button[aria-label*="Send"]',
      userMessage: '.message-out, [class*="outgoing"]',
      contactMessage: '.message-in, [class*="incoming"]',
    },
    waitForSelector: 'textarea, [contenteditable="true"]',
    sendDelay: 500,
  },

  messenger: {
    name: 'Facebook Messenger',
    urlPattern: /messenger\.com/i,
    selectors: {
      messageList: '[role="main"]',
      messageItem: '[role="row"]',
      messageContent: '[dir="auto"]',
      inputField: '[role="textbox"][contenteditable="true"]',
      sendButton: '[aria-label*="Press Enter to send"]',
    },
    waitForSelector: '[role="textbox"][contenteditable="true"]',
    sendDelay: 300,
  },

  whatsapp: {
    name: 'WhatsApp Web',
    urlPattern: /web\.whatsapp\.com/i,
    selectors: {
      messageList: '[data-testid="conversation-panel-messages"]',
      messageItem: '.message-in, .message-out',
      messageContent: '.selectable-text[data-testid="msg-text"]',
      inputField: '[data-testid="conversation-compose-box-input"]',
      sendButton: '[data-testid="send"]',
      userMessage: '.message-out',
      contactMessage: '.message-in',
    },
    waitForSelector: '[data-testid="conversation-compose-box-input"]',
    sendDelay: 400,
  },

  telegram: {
    name: 'Telegram Web',
    urlPattern: /web\.telegram\.org/i,
    selectors: {
      messageList: '.messages-container',
      messageItem: '.message',
      messageContent: '.message-content, .text',
      inputField: '#editable-message-text',
      sendButton: 'button.send',
    },
    waitForSelector: '#editable-message-text',
    sendDelay: 300,
  },
};

export function detectPlatform(url: string): PlatformSelectors | null {
  for (const platform of Object.values(PLATFORM_SELECTORS)) {
    if (platform.urlPattern.test(url)) {
      return platform;
    }
  }
  return null;
}
