import { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import ConnectionPanel from './components/ConnectionPanel';
import ChatInterface from './components/ChatInterface';
import StatsPanel from './components/StatsPanel';
import ConfigModal from './components/ConfigModal';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="app-container">
      <Header onSettingsClick={() => setShowConfig(true)} />

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="content">
        {activeTab === 'main' && (
          <>
            <ConnectionPanel />
            <ChatInterface />
            <StatsPanel />
          </>
        )}

        {activeTab === 'settings' && (
          <div className="glass-card">
            <h2 className="section-title">⚙️ Settings</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Settings panel coming soon. Use the Settings button in the header.
            </p>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="glass-card">
            <h2 className="section-title">📚 Documentation</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              For detailed documentation, please check:
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li><strong>README.md</strong> - Project overview</li>
              <li><strong>docs/PLAN.md</strong> - Development plan</li>
              <li><strong>docs/MOCKUP.md</strong> - UI mockups</li>
              <li><strong>docs/mockup.html</strong> - Interactive mockup</li>
            </ul>
          </div>
        )}
      </div>

      {showConfig && <ConfigModal onClose={() => setShowConfig(false)} />}
    </div>
  );
}

export default App;
