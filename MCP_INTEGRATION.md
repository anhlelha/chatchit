# Chrome DevTools MCP Integration Guide

## Overview

This document explains how to integrate Chrome DevTools MCP (Model Context Protocol) with the Chat App Launcher. The MCP allows us to control Chrome browser and interact with web-based chat applications.

## Architecture

```
Chat App Launcher (React)
    ↓
MCP Client (TypeScript)
    ↓
MCP Server (Chrome DevTools)
    ↓
Chrome Browser
    ↓
Chat Application (Zalo, Messenger, etc.)
```

## Prerequisites

### 1. Install MCP SDK

```bash
npm install @modelcontextprotocol/sdk
```

### 2. Setup Chrome DevTools MCP Server

The Chrome DevTools MCP server needs to be running separately. There are several options:

#### Option A: Use existing MCP server
If you already have a Chrome DevTools MCP server, note its connection details.

#### Option B: Use Puppeteer-based approach
We can use Puppeteer to launch Chrome with debugging port:

```bash
npm install puppeteer chrome-remote-interface
```

#### Option C: Manual Chrome launch
Launch Chrome with remote debugging:

```bash
# On Linux/Mac
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug

# On Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir=C:\temp\chrome-debug
```

## Implementation Plan

### Phase 1: MCP Client Setup
- [ ] Install MCP SDK dependencies
- [ ] Create MCP client connection manager
- [ ] Implement connection/reconnection logic
- [ ] Add error handling and logging

### Phase 2: Browser Control
- [ ] Launch Chrome with debugging enabled
- [ ] Navigate to chat URL
- [ ] Manage browser tabs and windows
- [ ] Handle authentication/session management

### Phase 3: DOM Interaction
- [ ] Query DOM elements for messages
- [ ] Extract message content and metadata
- [ ] Find input fields and send buttons
- [ ] Type messages and click send

### Phase 4: Platform-Specific Integration
- [ ] Zalo selectors and logic
- [ ] Facebook Messenger selectors
- [ ] WhatsApp Web selectors
- [ ] Telegram Web selectors

## Platform-Specific Selectors

### Zalo (chat.zalo.me)

```typescript
const ZaloSelectors = {
  messageList: '.message-list',
  messageItem: '.message-item',
  messageContent: '.message-content',
  inputField: 'textarea[placeholder*="Nhập tin nhắn"]',
  sendButton: 'button[aria-label="Gửi"]',
  userMessage: '.message-out',
  contactMessage: '.message-in',
};
```

### Facebook Messenger (messenger.com)

```typescript
const MessengerSelectors = {
  messageList: '[role="main"]',
  messageItem: '[role="row"]',
  messageContent: '[dir="auto"]',
  inputField: '[role="textbox"][contenteditable="true"]',
  sendButton: '[aria-label="Press Enter to send"]',
};
```

### WhatsApp Web (web.whatsapp.com)

```typescript
const WhatsAppSelectors = {
  messageList: '.message-list',
  messageItem: '.message-in, .message-out',
  messageContent: '.selectable-text',
  inputField: '[role="textbox"][contenteditable="true"]',
  sendButton: 'button[aria-label*="Send"]',
};
```

### Telegram Web (web.telegram.org)

```typescript
const TelegramSelectors = {
  messageList: '.messages-container',
  messageItem: '.message',
  messageContent: '.message-content',
  inputField: '#editable-message-text',
  sendButton: 'button.send',
};
```

## Security Considerations

### 1. User Data Protection
- Never store passwords or sensitive data
- Use Chrome's secure storage for sessions
- Clear data on disconnect

### 2. Rate Limiting
- Add delays between messages to avoid detection
- Randomize timing to appear more human-like
- Respect platform rate limits

### 3. Terms of Service
- Warn users about platform ToS
- Add disclaimer about automation
- Allow users to disable automation

## Error Handling

### Common Issues

1. **Connection Failed**
   - Check if Chrome is running with debugging enabled
   - Verify port 9222 is not blocked
   - Check network/firewall settings

2. **Selectors Not Found**
   - Chat platform may have updated UI
   - User may be on wrong page
   - Platform may have anti-automation measures

3. **Authentication Required**
   - User needs to login manually first
   - Session may have expired
   - 2FA may be required

## Testing Strategy

### 1. Unit Tests
- Test selector matching
- Test message extraction
- Test message sending logic

### 2. Integration Tests
- Test with real browser
- Test each platform individually
- Test error scenarios

### 3. Manual Testing
- Test with actual chat accounts
- Verify messages are sent correctly
- Check for any UI glitches

## Configuration

Add to `src/types/index.ts`:

```typescript
export interface PlatformConfig {
  name: string;
  urlPattern: RegExp;
  selectors: {
    messageList: string;
    messageItem: string;
    messageContent: string;
    inputField: string;
    sendButton: string;
  };
  authentication?: {
    loginUrl: string;
    loginRequired: boolean;
  };
}
```

## Usage Example

```typescript
// Connect to chat application
await mcpService.connect('https://chat.zalo.me');

// Read latest messages
const messages = await mcpService.readMessages();

// Send a message
await mcpService.sendMessage('Hello from Chat App Launcher!');

// Disconnect
await mcpService.disconnect();
```

## Next Steps

1. Install MCP SDK: `npm install @modelcontextprotocol/sdk`
2. Choose Chrome launch method (Puppeteer recommended)
3. Implement MCP client in `src/services/mcpService.ts`
4. Add platform configurations
5. Test with one platform first (Zalo recommended)
6. Expand to other platforms

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Puppeteer Docs](https://pptr.dev/)
- [Chrome Remote Interface](https://github.com/cyrus-and/chrome-remote-interface)

## Support

If you encounter issues:
1. Check Chrome debugging port is accessible
2. Verify selectors are up to date
3. Check console logs for errors
4. Review platform-specific documentation
