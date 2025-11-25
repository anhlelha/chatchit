import puppeteer, { Browser, Page } from 'puppeteer';
import { detectPlatform, PlatformSelectors } from './platformSelectors.js';

export class BrowserController {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private currentUrl: string = '';
  private platform: PlatformSelectors | null = null;

  async launch(): Promise<void> {
    if (this.browser) {
      console.log('[Browser] Already launched');
      return;
    }

    console.log('[Browser] Launching Chrome...');
    this.browser = await puppeteer.launch({
      headless: false, // Show browser UI
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
      ],
      defaultViewport: {
        width: 1280,
        height: 800,
      },
    });

    const pages = await this.browser.pages();
    this.page = pages[0] || (await this.browser.newPage());

    // Set user agent to avoid detection
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    console.log('[Browser] Launched successfully');
  }

  async navigate(url: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not launched');
    }

    console.log(`[Browser] Navigating to ${url}...`);
    this.currentUrl = url;
    this.platform = detectPlatform(url);

    if (!this.platform) {
      console.warn(`[Browser] Unknown platform for URL: ${url}`);
    } else {
      console.log(`[Browser] Detected platform: ${this.platform.name}`);
    }

    await this.page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Wait for chat interface to load
    if (this.platform?.waitForSelector) {
      try {
        await this.page.waitForSelector(this.platform.waitForSelector, {
          timeout: 30000,
        });
        console.log('[Browser] Chat interface loaded');
      } catch (error) {
        console.warn('[Browser] Timeout waiting for chat interface. May need manual login.');
      }
    }
  }

  async readMessages(): Promise<Array<{ role: string; content: string; timestamp?: string }>> {
    if (!this.page || !this.platform) {
      throw new Error('Browser not ready or platform not detected');
    }

    console.log('[Browser] Reading messages...');

    try {
      const messages = await this.page.evaluate((selectors) => {
        const messageItems = document.querySelectorAll(selectors.messageItem);
        const results: Array<{ role: string; content: string; timestamp?: string }> = [];

        messageItems.forEach((item) => {
          const contentEl = item.querySelector(selectors.messageContent);
          if (!contentEl) return;

          const content = contentEl.textContent?.trim() || '';
          if (!content) return;

          // Determine if it's a user message or contact message
          let role = 'unknown';
          if (selectors.userMessage && item.matches(selectors.userMessage)) {
            role = 'user';
          } else if (selectors.contactMessage && item.matches(selectors.contactMessage)) {
            role = 'contact';
          }

          // Try to extract timestamp if available
          let timestamp: string | undefined;
          if (selectors.messageTime) {
            const timeEl = item.querySelector(selectors.messageTime);
            timestamp = timeEl?.textContent?.trim();
          }

          results.push({ role, content, timestamp });
        });

        // Return only last 10 messages to avoid overwhelming
        return results.slice(-10);
      }, this.platform.selectors);

      console.log(`[Browser] Read ${messages.length} messages`);
      return messages;
    } catch (error) {
      console.error('[Browser] Error reading messages:', error);
      return [];
    }
  }

  async sendMessage(message: string): Promise<void> {
    if (!this.page || !this.platform) {
      throw new Error('Browser not ready or platform not detected');
    }

    console.log(`[Browser] Sending message: ${message.substring(0, 50)}...`);

    try {
      // Find and focus input field
      await this.page.waitForSelector(this.platform.selectors.inputField, {
        timeout: 10000,
      });

      // Type the message
      await this.page.type(this.platform.selectors.inputField, message, {
        delay: 50, // Add delay to simulate human typing
      });

      // Wait a bit before clicking send
      await this.page.waitForTimeout(this.platform.sendDelay || 300);

      // Click send button
      const sendButton = await this.page.$(this.platform.selectors.sendButton);
      if (sendButton) {
        await sendButton.click();
        console.log('[Browser] Message sent successfully');
      } else {
        // Fallback: Press Enter
        await this.page.keyboard.press('Enter');
        console.log('[Browser] Message sent via Enter key');
      }

      // Wait for message to be sent
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('[Browser] Error sending message:', error);
      throw new Error(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async takeScreenshot(path: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not launched');
    }

    await this.page.screenshot({ path, fullPage: false });
    console.log(`[Browser] Screenshot saved to ${path}`);
  }

  async close(): Promise<void> {
    if (this.browser) {
      console.log('[Browser] Closing...');
      await this.browser.close();
      this.browser = null;
      this.page = null;
      this.currentUrl = '';
      this.platform = null;
      console.log('[Browser] Closed');
    }
  }

  isConnected(): boolean {
    return this.browser !== null && this.page !== null;
  }

  getCurrentUrl(): string {
    return this.currentUrl;
  }

  getPlatform(): PlatformSelectors | null {
    return this.platform;
  }
}
