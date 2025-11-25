import { useAppStore } from '../store/appStore';
import './StatsPanel.css';

function StatsPanel() {
  const { stats } = useAppStore();

  return (
    <div className="glass-card">
      <h2 className="section-title">📊 Session Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalMessages}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.messagesSent}</div>
          <div className="stat-label">Messages Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pendingApproval}</div>
          <div className="stat-label">Pending Approval</div>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
