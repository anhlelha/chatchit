import './Header.css';

interface HeaderProps {
  onSettingsClick: () => void;
}

function Header({ onSettingsClick }: HeaderProps) {
  return (
    <div className="header">
      <h1 className="header-title">⚡ Chat App Launcher</h1>
      <button className="settings-btn" onClick={onSettingsClick}>
        ⚙ Settings
      </button>
    </div>
  );
}

export default Header;
