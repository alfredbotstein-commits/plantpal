import React from 'react';

export default function TabBar({ screen, navigate }) {
  return (
    <nav className="tab-bar" role="navigation" aria-label="Main navigation">
      <button
        className={`tab-item ${screen === 'home' ? 'active' : ''}`}
        onClick={() => navigate('home')}
        aria-label="My Plants"
        aria-current={screen === 'home' ? 'page' : undefined}
      >
        <span className="icon">🌿</span>
        My Plants
      </button>
      <button
        className={`tab-item ${screen === 'schedule' ? 'active' : ''}`}
        onClick={() => navigate('schedule')}
        aria-label="Schedule"
        aria-current={screen === 'schedule' ? 'page' : undefined}
      >
        <span className="icon">📅</span>
        Schedule
      </button>
      <button
        className="tab-add"
        onClick={() => navigate('add')}
        aria-label="Add plant"
      >
        +
      </button>
      <button
        className={`tab-item ${screen === 'settings' ? 'active' : ''}`}
        onClick={() => navigate('settings')}
        aria-label="Settings"
        aria-current={screen === 'settings' ? 'page' : undefined}
      >
        <span className="icon">⚙️</span>
        Settings
      </button>
    </nav>
  );
}
