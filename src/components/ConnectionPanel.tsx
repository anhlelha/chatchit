import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { mcpService } from '../services/mcpService';
import './ConnectionPanel.css';

function ConnectionPanel() {
  const { chatUrl, connectionStatus, setChatUrl, setConnectionStatus } = useAppStore();
  const [inputUrl, setInputUrl] = useState(chatUrl || 'https://chat.zalo.me');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!inputUrl) {
      alert('Please enter a chat URL');
      return;
    }

    setIsLoading(true);
    setConnectionStatus('connecting');

    try {
      await mcpService.connect(inputUrl);
      setChatUrl(inputUrl);
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus('error');
      alert('Failed to connect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await mcpService.disconnect();
      setConnectionStatus('disconnected');
    } catch (error) {
      console.error('Disconnect error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return `Connected to ${chatUrl}`;
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection failed';
      default:
        return 'Not Connected';
    }
  };

  const getStatusClass = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'connected';
      case 'connecting':
        return 'connecting';
      case 'error':
        return 'error';
      default:
        return '';
    }
  };

  return (
    <div className="glass-card">
      <h2 className="section-title">🌐 Connection</h2>

      <div className="url-input-group">
        <input
          type="text"
          className="url-input"
          placeholder="https://chat.zalo.me"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          disabled={connectionStatus === 'connected' || isLoading}
        />
        {connectionStatus !== 'connected' ? (
          <button
            className="launch-btn"
            onClick={handleConnect}
            disabled={isLoading}
          >
            {isLoading ? '🔄 Connecting...' : '🚀 Launch'}
          </button>
        ) : (
          <button
            className="disconnect-btn"
            onClick={handleDisconnect}
            disabled={isLoading}
          >
            🔌 Disconnect
          </button>
        )}
      </div>

      <div className="status">
        <span className={`status-dot ${getStatusClass()}`}></span>
        <span>{getStatusText()}</span>
      </div>

      <div className="info-box">
        💡 <strong>Supported:</strong> Zalo • Facebook Messenger • WhatsApp Web • Telegram Web
      </div>
    </div>
  );
}

export default ConnectionPanel;
