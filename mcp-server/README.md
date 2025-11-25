# MCP Server - Chat App Launcher

WebSocket server that controls Chrome browser via Puppeteer to interact with web-based chat applications.

## Features

- 🌐 Controls Chrome via Puppeteer
- 🔌 WebSocket API for client communication
- 🤖 Platform-specific selectors (Zalo, Messenger, WhatsApp, Telegram)
- 📝 Read messages from chat interfaces
- ✉️ Send messages automatically
- 🔄 Automatic reconnection
- 📸 Screenshot capability

## Installation

```bash
cd mcp-server
npm install
```

## Usage

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
# Build
npm run build

# Run
npm start
```

The server will start on `ws://localhost:8080`

## API

### Connect to Chat App

```json
{
  "id": "msg-1",
  "type": "connect",
  "payload": {
    "url": "https://chat.zalo.me"
  }
}
```

Response:
```json
{
  "id": "msg-1",
  "success": true,
  "data": {
    "message": "Connected successfully",
    "url": "https://chat.zalo.me",
    "platform": "Zalo"
  }
}
```

### Send Message

```json
{
  "id": "msg-2",
  "type": "sendMessage",
  "payload": {
    "content": "Hello from MCP!"
  }
}
```

### Read Messages

```json
{
  "id": "msg-3",
  "type": "readMessages"
}
```

Response:
```json
{
  "id": "msg-3",
  "success": true,
  "data": {
    "messages": [
      {
        "role": "user",
        "content": "Hello!",
        "timestamp": "10:30 AM"
      },
      {
        "role": "contact",
        "content": "Hi there!",
        "timestamp": "10:31 AM"
      }
    ]
  }
}
```

### Get Status

```json
{
  "id": "msg-4",
  "type": "status"
}
```

### Disconnect

```json
{
  "id": "msg-5",
  "type": "disconnect"
}
```

### Take Screenshot

```json
{
  "id": "msg-6",
  "type": "screenshot",
  "payload": {
    "path": "./screenshot.png"
  }
}
```

## Supported Platforms

### Zalo (chat.zalo.me)
- ✅ Message reading
- ✅ Message sending
- ⚠️ Requires manual login first

### Facebook Messenger (messenger.com)
- ✅ Message reading
- ✅ Message sending
- ⚠️ Requires manual login first

### WhatsApp Web (web.whatsapp.com)
- ✅ Message reading
- ✅ Message sending
- ⚠️ Requires manual login and QR code scan

### Telegram Web (web.telegram.org)
- ✅ Message reading
- ✅ Message sending
- ⚠️ Requires manual login first

## Configuration

Platform selectors can be customized in `src/platformSelectors.ts`.

Example for adding a new platform:

```typescript
newplatform: {
  name: 'New Platform',
  urlPattern: /newplatform\.com/i,
  selectors: {
    messageList: '.messages',
    messageItem: '.message',
    messageContent: '.text',
    inputField: 'textarea',
    sendButton: 'button.send',
  },
  waitForSelector: 'textarea',
  sendDelay: 500,
}
```

## Architecture

```
React App (Client)
    ↕ WebSocket
MCP Server (Node.js)
    ↕ Puppeteer
Chrome Browser
    ↕ DOM
Chat Application
```

## Troubleshooting

### Server won't start
- Check if port 8080 is already in use
- Try: `lsof -i :8080` and kill the process

### Browser doesn't launch
- Make sure Chrome/Chromium is installed
- Puppeteer will download Chromium automatically on first run

### Can't find selectors
- Chat platform may have updated their UI
- Open DevTools and inspect the chat interface
- Update selectors in `src/platformSelectors.ts`

### Messages not sending
- Check browser console for errors
- Verify you're logged in to the chat platform
- Try manual login first before automation

### Connection timeout
- Some platforms have anti-automation measures
- Try increasing delays in platform selectors
- May need to add additional wait conditions

## Security Notes

- Never commit API keys or credentials
- Use at your own risk
- Respect platform Terms of Service
- Add delays to avoid rate limiting
- Don't spam messages

## Development

### Project Structure

```
mcp-server/
├── src/
│   ├── server.ts              # WebSocket server
│   ├── browserController.ts   # Puppeteer integration
│   └── platformSelectors.ts   # Platform configs
├── package.json
├── tsconfig.json
└── README.md
```

### Adding New Features

1. Add new message type to `MCPMessage` interface in `server.ts`
2. Implement handler in `handleMessage()` method
3. Add corresponding method in `BrowserController` if needed
4. Update React client's `mcpService.ts`

## License

MIT
