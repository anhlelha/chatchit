# 🚀 Quick Start Guide - Chat App Launcher

Get up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
# Install React app dependencies
npm install

# Install MCP server dependencies
cd mcp-server
npm install
cd ..
```

## Step 2: Start MCP Server

Open a terminal and run:

```bash
cd mcp-server
npm run dev
```

You should see:
```
🚀 MCP Server starting on ws://localhost:8080
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[WS] WebSocket server ready
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MCP Server is running!
   Connect from your app: ws://localhost:8080
   Press Ctrl+C to stop
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Keep this terminal open!**

## Step 3: Start React App

Open a NEW terminal and run:

```bash
npm run dev
```

The app will open at: **http://localhost:3000**

## Step 4: Configure Settings (Optional)

1. Click **⚙ Settings** in the app
2. Enter your **OpenAI API Key** (or leave empty for mock mode)
3. Customize **Chat Style** if desired
4. Click **Save Settings**

## Step 5: Connect to a Chat App

1. Enter a chat URL, for example:
   - `https://chat.zalo.me`
   - `https://messenger.com`
   - `https://web.whatsapp.com`
   - `https://web.telegram.org`

2. Click **🚀 Launch**

3. A Chrome browser window will open

4. **Login manually** to your chat account

5. Once logged in, return to the Chat App Launcher

## Step 6: Start Chatting

### Manual Mode (Review before sending)
1. Select **Manual Mode**
2. Click **▶ Start**
3. A demo message will appear
4. Review the AI's proposed response
5. Click **✓ Send** to approve, or **✏ Edit** to modify

### Auto Mode (Automatic responses)
1. Select **Auto Mode**
2. Click **▶ Start**
3. AI will automatically respond to messages
4. Monitor the chat interface

## Troubleshooting

### MCP Server Won't Start
- **Error: Port 8080 in use**
  ```bash
  # Kill process using port 8080
  lsof -i :8080
  kill -9 <PID>
  ```

### React App Won't Connect to MCP
- Check console for errors (F12)
- Make sure MCP server is running
- Verify WebSocket connection: `ws://localhost:8080`

### Browser Won't Open
- Chrome/Chromium not installed
- Puppeteer will download Chromium automatically on first run
- Wait for download to complete

### Can't Login to Chat App
- Some platforms require manual login first
- Login in the Chrome window that opens
- Don't close the browser window

### Messages Not Sending
- Check if you're logged in
- Verify chat interface is loaded
- Platform may have updated selectors
- Check MCP server logs for errors

### OpenAI Errors
- Check API key is valid
- Verify you have credits
- Or use mock mode (no API key)

## Example Workflow

### Testing with Zalo

1. **Start servers** (MCP + React app)
2. **Enter URL**: `https://chat.zalo.me`
3. **Launch**: Browser opens
4. **Login**: Enter your Zalo credentials
5. **Start**: Click ▶ Start in the app
6. **Watch**: AI responds to messages

### Testing with Mock Mode (No API Key)

1. Don't enter API key in settings
2. App will use mock responses
3. Responses are random from predefined list
4. Good for testing UI without OpenAI costs

## What's Next?

### Customize Chat Style
Go to Settings > Chat Style Configuration:
- **Friendly**: Fun and casual
- **Professional**: Business tone
- **Technical**: Developer-focused
- **Custom**: Write your own prompt

### Advanced Configuration
- Adjust **Temperature** (creativity)
- Set **Max Tokens** (response length)
- Enable/disable **Auto-scroll**
- Toggle **Timestamps**

### Multiple Platforms
Test with different chat platforms:
1. Disconnect from current platform
2. Enter new URL
3. Launch and login
4. Continue chatting

## Tips

### Performance
- Close unnecessary browser tabs
- Use Manual mode for better control
- Monitor message count

### Safety
- Start with Manual mode
- Review AI responses before sending
- Use appropriate chat style for context
- Respect platform Terms of Service

### Debugging
- Check browser console (F12)
- Check MCP server terminal logs
- Use Screenshot feature to debug UI issues

## Quick Commands

```bash
# Start everything
cd mcp-server && npm run dev &
cd .. && npm run dev

# Stop everything
# Press Ctrl+C in both terminals

# Build for production
npm run build
cd mcp-server && npm run build

# Clean install
rm -rf node_modules mcp-server/node_modules
npm install
cd mcp-server && npm install
```

## Need Help?

- Check [README.md](./README.md) for detailed documentation
- Review [MCP_INTEGRATION.md](./MCP_INTEGRATION.md) for MCP details
- Check [mcp-server/README.md](./mcp-server/README.md) for server API

## Support

If you encounter issues:
1. Check console logs (both React app and MCP server)
2. Verify all dependencies are installed
3. Make sure both servers are running
4. Try restarting both servers
5. Check platform-specific selectors are up to date

---

**Ready? Let's go! 🎉**

```bash
# Terminal 1
cd mcp-server
npm run dev

# Terminal 2
npm run dev
```

Then open http://localhost:3000 and start chatting!
