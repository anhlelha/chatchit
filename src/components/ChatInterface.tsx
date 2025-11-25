import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';
import { openaiService } from '../services/openaiService';
import { mcpService } from '../services/mcpService';
import type { Message } from '../types';
import './ChatInterface.css';

function ChatInterface() {
  const {
    chatMode,
    isRunning,
    messages,
    pendingMessage,
    connectionStatus,
    config,
    setChatMode,
    setIsRunning,
    addMessage,
    setPendingMessage,
    clearMessages,
  } = useAppStore();

  const [editingMessage, setEditingMessage] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (config.autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, pendingMessage, config.autoScroll]);

  const generateAIResponse = async () => {
    if (!config.openaiApiKey) {
      console.warn('No API key configured, using mock response');
      return await openaiService.generateMockResponse(messages);
    }

    try {
      openaiService.setApiKey(config.openaiApiKey);
      openaiService.setModel(config.openaiModel);
      return await openaiService.generateResponse(messages, config.chatStyle);
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  };

  const handleStart = async () => {
    if (connectionStatus !== 'connected') {
      alert('Please connect to a chat application first');
      return;
    }

    setIsRunning(true);

    // Simulate receiving a user message for demo
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: 'Cho tôi biết giá sản phẩm X?',
      timestamp: new Date(),
      status: 'sent',
    };

    addMessage(userMessage);

    // Generate AI response
    try {
      const aiContent = await generateAIResponse();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiContent,
        timestamp: new Date(),
        status: 'pending',
      };

      if (chatMode === 'manual') {
        setPendingMessage(aiMessage);
      } else {
        // Auto mode: send directly
        await handleSend(aiMessage);
      }
    } catch (error) {
      alert('Error generating AI response. Please check your API key.');
      setIsRunning(false);
    }
  };

  const handleSend = async (message: Message) => {
    try {
      await mcpService.sendMessage(message.content);
      const sentMessage = { ...message, status: 'sent' as const };
      addMessage(sentMessage);
      setPendingMessage(null);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const handleEdit = () => {
    if (pendingMessage) {
      setEditingMessage(pendingMessage.content);
      setShowEditDialog(true);
    }
  };

  const handleSaveEdit = async () => {
    if (pendingMessage && editingMessage.trim()) {
      const updatedMessage = { ...pendingMessage, content: editingMessage };
      await handleSend(updatedMessage);
      setShowEditDialog(false);
      setEditingMessage('');
    }
  };

  const handleReject = async () => {
    setPendingMessage(null);

    // Generate a new response
    try {
      const aiContent = await generateAIResponse();
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'ai',
        content: aiContent,
        timestamp: new Date(),
        status: 'pending',
      };
      setPendingMessage(aiMessage);
    } catch (error) {
      alert('Error generating new response');
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setPendingMessage(null);
  };

  const handleClear = () => {
    if (confirm('Clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <div className="glass-card">
      <h2 className="section-title">💬 Chat Interface</h2>

      <div className="mode-selector">
        <label className={`mode-option ${chatMode === 'manual' ? 'active' : ''}`}>
          <input
            type="radio"
            name="mode"
            value="manual"
            checked={chatMode === 'manual'}
            onChange={(e) => setChatMode(e.target.value as 'manual')}
          />
          <span>Manual Mode</span>
        </label>
        <label className={`mode-option ${chatMode === 'auto' ? 'active' : ''}`}>
          <input
            type="radio"
            name="mode"
            value="auto"
            checked={chatMode === 'auto'}
            onChange={(e) => setChatMode(e.target.value as 'auto')}
          />
          <span>Auto Mode</span>
        </label>
      </div>

      <div className="chat-interface">
        <div className="chat-header">
          <div className="chat-header-info">
            <span>
              <strong>Status:</strong>{' '}
              <span className={`status-dot ${connectionStatus === 'connected' ? 'connected' : ''}`}></span>
              {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
            <span>
              <strong>Messages:</strong> {messages.length}
            </span>
          </div>
          <div className="chat-header-mode">
            Mode: {chatMode.charAt(0).toUpperCase() + chatMode.slice(1)}
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && !pendingMessage && (
            <div className="empty-state">
              <p>No messages yet. Click "Start" to begin.</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-header">
                {message.role === 'user' ? '👤 User' : '🤖 AI'} •{' '}
                {message.timestamp.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {message.status === 'sent' && message.role === 'ai' && (
                  <span className="badge success">Sent</span>
                )}
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}

          {pendingMessage && (
            <div className="message pending">
              <div className="message-header">
                🤖 AI Response •{' '}
                {pendingMessage.timestamp.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                <span className="badge pending">Pending Approval</span>
              </div>
              <div className="message-content">{pendingMessage.content}</div>
              <div className="message-actions">
                <button className="btn btn-edit" onClick={handleEdit}>
                  ✏ Edit
                </button>
                <button className="btn btn-send" onClick={() => handleSend(pendingMessage)}>
                  ✓ Send
                </button>
                <button className="btn btn-reject" onClick={handleReject}>
                  ✕ Reject
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="controls">
        {!isRunning ? (
          <button className="control-btn primary" onClick={handleStart}>
            ▶ Start
          </button>
        ) : (
          <button className="control-btn" onClick={handlePause}>
            ⏸ Pause
          </button>
        )}
        <button className="control-btn" onClick={handleStop}>
          ⏹ Stop
        </button>
        <button className="control-btn" onClick={handleClear}>
          🗑 Clear History
        </button>
      </div>

      {showEditDialog && (
        <div className="edit-dialog-overlay" onClick={() => setShowEditDialog(false)}>
          <div className="edit-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>✏ Edit Message</h3>
            <textarea
              className="edit-textarea"
              value={editingMessage}
              onChange={(e) => setEditingMessage(e.target.value)}
              rows={6}
              autoFocus
            />
            <div className="edit-dialog-actions">
              <button className="btn btn-edit" onClick={() => setShowEditDialog(false)}>
                Cancel
              </button>
              <button className="btn btn-send" onClick={handleSaveEdit}>
                ✓ Save & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
