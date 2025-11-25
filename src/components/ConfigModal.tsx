import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import './ConfigModal.css';

interface ConfigModalProps {
  onClose: () => void;
}

const chatStyleTemplates = {
  friendly: 'Bạn là một trợ lý thân thiện và vui vẻ. Sử dụng emoji một cách phù hợp và trả lời ngắn gọn, lịch sự.',
  professional: 'Bạn là một trợ lý chuyên nghiệp và lịch sự. Trả lời một cách chính xác, ngắn gọn và hữu ích.',
  funny: 'Bạn là một trợ lý hài hước và vui tính. Thêm chút hài hước vào câu trả lời nhưng vẫn hữu ích.',
  technical: 'Bạn là một chuyên gia kỹ thuật. Trả lời chi tiết, chính xác và sử dụng thuật ngữ chuyên môn khi cần.',
};

function ConfigModal({ onClose }: ConfigModalProps) {
  const { config, updateConfig } = useAppStore();
  const [formData, setFormData] = useState(config);

  const handleSave = () => {
    updateConfig(formData);
    alert('Settings saved successfully!');
    onClose();
  };

  const handleTemplateSelect = (template: keyof typeof chatStyleTemplates) => {
    setFormData({ ...formData, chatStyle: chatStyleTemplates[template] });
  };

  return (
    <div className="config-modal-overlay" onClick={onClose}>
      <div className="config-modal" onClick={(e) => e.stopPropagation()}>
        <div className="config-modal-header">
          <h2>⚙ Settings</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="config-modal-content">
          {/* OpenAI Configuration */}
          <section className="config-section">
            <h3>🔑 OpenAI Configuration</h3>
            <div className="form-group">
              <label>API Key *</label>
              <input
                type="password"
                placeholder="sk-proj-..."
                value={formData.openaiApiKey}
                onChange={(e) =>
                  setFormData({ ...formData, openaiApiKey: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Model</label>
              <select
                value={formData.openaiModel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    openaiModel: e.target.value as 'gpt-4' | 'gpt-3.5-turbo',
                  })
                }
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>
          </section>

          {/* Chat Style Configuration */}
          <section className="config-section">
            <h3>💬 Chat Style Configuration</h3>
            <div className="form-group">
              <label>System Prompt</label>
              <textarea
                rows={4}
                value={formData.chatStyle}
                onChange={(e) =>
                  setFormData({ ...formData, chatStyle: e.target.value })
                }
                placeholder="Describe how the AI should behave..."
              />
            </div>
            <div className="template-buttons">
              <button onClick={() => handleTemplateSelect('friendly')}>Friendly</button>
              <button onClick={() => handleTemplateSelect('professional')}>Professional</button>
              <button onClick={() => handleTemplateSelect('funny')}>Funny</button>
              <button onClick={() => handleTemplateSelect('technical')}>Technical</button>
            </div>
          </section>

          {/* Advanced Settings */}
          <section className="config-section">
            <h3>🎛️ Advanced Settings</h3>
            <div className="form-group">
              <label>
                Temperature: {formData.temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature}
                onChange={(e) =>
                  setFormData({ ...formData, temperature: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="form-group">
              <label>
                Max Tokens: {formData.maxTokens}
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={formData.maxTokens}
                onChange={(e) =>
                  setFormData({ ...formData, maxTokens: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.autoScroll}
                  onChange={(e) =>
                    setFormData({ ...formData, autoScroll: e.target.checked })
                  }
                />
                Auto-scroll to latest message
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.showTimestamps}
                  onChange={(e) =>
                    setFormData({ ...formData, showTimestamps: e.target.checked })
                  }
                />
                Show timestamps
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.playSound}
                  onChange={(e) =>
                    setFormData({ ...formData, playSound: e.target.checked })
                  }
                />
                Play sound on new message
              </label>
            </div>
          </section>
        </div>

        <div className="config-modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-save" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfigModal;
