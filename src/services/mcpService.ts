import type { MCPService } from '../types';

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

class MCPServiceImpl implements MCPService {
  private ws: WebSocket | null = null;
  private connected = false;
  private currentUrl = '';
  private messageId = 0;
  private pendingRequests: Map<string, {
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }> = new Map();

  private readonly MCP_SERVER_URL = import.meta.env.VITE_MCP_SERVER_URL || 'ws://localhost:8080';

  constructor() {
    // Auto-connect to MCP server on init
    console.log(`[MCP Client] Using MCP server URL: ${this.MCP_SERVER_URL}`);
    this.connectToMCPServer();
  }

  private connectToMCPServer(): void {
    try {
      console.log('[MCP Client] Connecting to MCP server...');

      this.ws = new WebSocket(this.MCP_SERVER_URL);

      this.ws.onopen = () => {
        console.log('[MCP Client] Connected to MCP server');
      };

      this.ws.onmessage = (event) => {
        try {
          const response: MCPResponse = JSON.parse(event.data);
          this.handleResponse(response);
        } catch (error) {
          console.error('[MCP Client] Error parsing response:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[MCP Client] WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('[MCP Client] Disconnected from MCP server');
        this.ws = null;

        // Attempt reconnection after 5 seconds
        setTimeout(() => {
          console.log('[MCP Client] Attempting to reconnect...');
          this.connectToMCPServer();
        }, 5000);
      };
    } catch (error) {
      console.error('[MCP Client] Failed to connect to MCP server:', error);
      console.warn('[MCP Client] Make sure MCP server is running on ws://localhost:8080');
    }
  }

  private handleResponse(response: MCPResponse): void {
    const pending = this.pendingRequests.get(response.id);

    if (pending) {
      if (response.success) {
        pending.resolve(response.data);
      } else {
        pending.reject(new Error(response.error || 'Unknown error'));
      }
      this.pendingRequests.delete(response.id);
    }
  }

  private sendMCPMessage(type: MCPMessage['type'], payload?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('Not connected to MCP server. Please start the MCP server first.'));
        return;
      }

      const id = `msg-${++this.messageId}`;
      const message: MCPMessage = { id, type, payload };

      // Store pending request
      this.pendingRequests.set(id, { resolve, reject });

      // Send message
      this.ws.send(JSON.stringify(message));

      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 30000);
    });
  }

  async connect(url: string): Promise<void> {
    console.log(`[MCP Client] Connecting to chat app: ${url}...`);

    try {
      const data = await this.sendMCPMessage('connect', { url });
      this.connected = true;
      this.currentUrl = url;
      console.log(`[MCP Client] Connected to ${url}`, data);
    } catch (error) {
      console.error('[MCP Client] Failed to connect:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    console.log('[MCP Client] Disconnecting from chat app...');

    try {
      await this.sendMCPMessage('disconnect');
      this.connected = false;
      this.currentUrl = '';
      console.log('[MCP Client] Disconnected successfully');
    } catch (error) {
      console.error('[MCP Client] Failed to disconnect:', error);
      throw error;
    }
  }

  async readMessages(): Promise<string[]> {
    if (!this.connected) {
      throw new Error('Not connected to chat app');
    }

    console.log('[MCP Client] Reading messages...');

    try {
      const data = await this.sendMCPMessage('readMessages');
      const messages = data.messages || [];

      console.log(`[MCP Client] Read ${messages.length} messages`);

      // Return only message contents
      return messages.map((msg: any) => msg.content);
    } catch (error) {
      console.error('[MCP Client] Failed to read messages:', error);
      return [];
    }
  }

  async sendMessage(message: string): Promise<void> {
    if (!this.connected) {
      throw new Error('Not connected to chat app');
    }

    console.log(`[MCP Client] Sending message: ${message.substring(0, 50)}...`);

    try {
      await this.sendMCPMessage('sendMessage', { content: message });
      console.log('[MCP Client] Message sent successfully');
    } catch (error) {
      console.error('[MCP Client] Failed to send message:', error);
      throw error;
    }
  }

  async getStatus(): Promise<{ connected: boolean; url: string; platform: string | null }> {
    try {
      const data = await this.sendMCPMessage('status');
      return {
        connected: data.connected || false,
        url: data.url || '',
        platform: data.platform || null,
      };
    } catch (error) {
      console.error('[MCP Client] Failed to get status:', error);
      return { connected: false, url: '', platform: null };
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  getCurrentUrl(): string {
    return this.currentUrl;
  }

  isMCPServerConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export const mcpService = new MCPServiceImpl();
