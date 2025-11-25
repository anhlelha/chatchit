import { WebSocketServer, WebSocket } from 'ws';
import { BrowserController } from './browserController.js';

const PORT = 8080;

interface MCPMessage {
  id: string;
  type: 'connect' | 'disconnect' | 'sendMessage' | 'readMessages' | 'status' | 'screenshot';
  payload?: any;
}

interface MCPResponse {
  id: string;
  success: boolean;
  data?: any;
  error?: string;
}

class MCPServer {
  private wss: WebSocketServer;
  private browserController: BrowserController;
  private clients: Set<WebSocket> = new Set();

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.browserController = new BrowserController();

    console.log(`\n🚀 MCP Server starting on ws://localhost:${port}`);
    console.log('━'.repeat(50));

    this.setupWebSocket();
  }

  private setupWebSocket(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('[WS] Client connected');
      this.clients.add(ws);

      // Send welcome message
      this.sendResponse(ws, {
        id: 'welcome',
        success: true,
        data: {
          message: 'Connected to MCP Server',
          version: '1.0.0',
        },
      });

      ws.on('message', async (data: Buffer) => {
        try {
          const message: MCPMessage = JSON.parse(data.toString());
          console.log(`[WS] Received message: ${message.type} (id: ${message.id})`);

          await this.handleMessage(ws, message);
        } catch (error) {
          console.error('[WS] Error parsing message:', error);
          this.sendResponse(ws, {
            id: 'error',
            success: false,
            error: 'Invalid message format',
          });
        }
      });

      ws.on('close', () => {
        console.log('[WS] Client disconnected');
        this.clients.delete(ws);
      });

      ws.on('error', (error) => {
        console.error('[WS] WebSocket error:', error);
        this.clients.delete(ws);
      });
    });

    console.log('[WS] WebSocket server ready');
  }

  private async handleMessage(ws: WebSocket, message: MCPMessage): Promise<void> {
    try {
      switch (message.type) {
        case 'connect': {
          const { url } = message.payload;

          if (!url) {
            throw new Error('URL is required');
          }

          // Launch browser if not already launched
          if (!this.browserController.isConnected()) {
            await this.browserController.launch();
          }

          // Navigate to URL
          await this.browserController.navigate(url);

          const platform = this.browserController.getPlatform();

          this.sendResponse(ws, {
            id: message.id,
            success: true,
            data: {
              message: 'Connected successfully',
              url,
              platform: platform?.name || 'Unknown',
            },
          });
          break;
        }

        case 'disconnect': {
          await this.browserController.close();

          this.sendResponse(ws, {
            id: message.id,
            success: true,
            data: { message: 'Disconnected successfully' },
          });
          break;
        }

        case 'sendMessage': {
          const { content } = message.payload;

          if (!content) {
            throw new Error('Message content is required');
          }

          if (!this.browserController.isConnected()) {
            throw new Error('Browser not connected. Please connect first.');
          }

          await this.browserController.sendMessage(content);

          this.sendResponse(ws, {
            id: message.id,
            success: true,
            data: { message: 'Message sent successfully' },
          });
          break;
        }

        case 'readMessages': {
          if (!this.browserController.isConnected()) {
            throw new Error('Browser not connected. Please connect first.');
          }

          const messages = await this.browserController.readMessages();

          this.sendResponse(ws, {
            id: message.id,
            success: true,
            data: { messages },
          });
          break;
        }

        case 'status': {
          const isConnected = this.browserController.isConnected();
          const currentUrl = this.browserController.getCurrentUrl();
          const platform = this.browserController.getPlatform();

          this.sendResponse(ws, {
            id: message.id,
            success: true,
            data: {
              connected: isConnected,
              url: currentUrl,
              platform: platform?.name || null,
            },
          });
          break;
        }

        case 'screenshot': {
          const { path } = message.payload || { path: './screenshot.png' };

          if (!this.browserController.isConnected()) {
            throw new Error('Browser not connected. Please connect first.');
          }

          await this.browserController.takeScreenshot(path);

          this.sendResponse(ws, {
            id: message.id,
            success: true,
            data: { message: `Screenshot saved to ${path}` },
          });
          break;
        }

        default:
          throw new Error(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error(`[WS] Error handling message:`, error);
      this.sendResponse(ws, {
        id: message.id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  private sendResponse(ws: WebSocket, response: MCPResponse): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(response));
    }
  }

  private broadcast(data: any): void {
    const message = JSON.stringify(data);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  async shutdown(): Promise<void> {
    console.log('\n[Server] Shutting down...');

    // Close browser
    await this.browserController.close();

    // Close all WebSocket connections
    this.clients.forEach((client) => {
      client.close();
    });

    // Close WebSocket server
    this.wss.close(() => {
      console.log('[Server] Shutdown complete');
      process.exit(0);
    });
  }
}

// Start server
const server = new MCPServer(PORT);

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await server.shutdown();
});

process.on('SIGTERM', async () => {
  await server.shutdown();
});

console.log('━'.repeat(50));
console.log('✅ MCP Server is running!');
console.log(`   Connect from your app: ws://localhost:${PORT}`);
console.log('   Press Ctrl+C to stop');
console.log('━'.repeat(50) + '\n');
