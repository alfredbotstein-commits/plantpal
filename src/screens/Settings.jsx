import React from 'react';
import { updateSettings, db } from '../db';

export default function Settings({ settings, refreshSettings, navigate }) {
  const toggle = async (key) => {
    await updateSettings({ [key]: !settings[key] });
    await refreshSettings();
  };

  const setDarkMode = async (mode) => {
    await updateSettings({ darkMode: mode });
    await refreshSettings();
  };

  const handleExport = async () => {
    const plants = await db.plants.toArray();
    const entries = await db.healthEntries.toArray();
    const data = JSON.stringify({ plants, healthEntries: entries, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantpal-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (data.plants) {
          for (const p of data.plants) {
            const { id, ...rest } = p;
            await db.plants.add(rest);
          }
        }
        if (data.healthEntries) {
          for (const e of data.healthEntries) {
            const { id, ...rest } = e;
            await db.healthEntries.add(rest);
          }
        }
      } catch {
        // Silently handle parse errors
      }
    };
    input.click();
  };

  return (
    <div className="screen" role="main" aria-label="Settings">
      <div className="top-bar">
        <h1>Settings</h1>
      </div>
      <div style={{ padding: '0 16px' }}>
        <div className="settings-section">
          <div className="settings-section-title">Notifications</div>
          <div className="settings-item">
            <label htmlFor="reminder-time">Reminder time</label>
            <input
              id="reminder-time"
              type="time"
              className="form-input"
              style={{ width: 120, minHeight: 40 }}
              value={settings.defaultReminderTime}
              onChange={async (e) => {
                await updateSettings({ defaultReminderTime: e.target.value });
                await refreshSettings();
              }}
            />
          </div>
          <div className="settings-item">
            <label>Sound</label>
            <button className={`toggle ${settings.soundEnabled ? 'on' : ''}`} onClick={() => toggle('soundEnabled')} role="switch" aria-checked={settings.soundEnabled} aria-label="Toggle sound">
              <div className="knob" />
            </button>
          </div>
          <div className="settings-item">
            <label>Overdue reminders</label>
            <button className={`toggle ${settings.overdueRemindersEnabled ? 'on' : ''}`} onClick={() => toggle('overdueRemindersEnabled')} role="switch" aria-checked={settings.overdueRemindersEnabled} aria-label="Toggle overdue reminders">
              <div className="knob" />
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Display</div>
          <div className="settings-item">
            <label>Dark mode</label>
            <select
              className="form-select"
              style={{ width: 120, minHeight: 40 }}
              value={settings.darkMode}
              onChange={e => setDarkMode(e.target.value)}
              aria-label="Dark mode preference"
            >
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Data</div>
          <div className="settings-item">
            <button onClick={handleExport} style={{ color: 'var(--primary)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, minHeight: 44 }} aria-label="Export plant data">
              Export plant data (JSON)
            </button>
          </div>
          <div className="settings-item">
            <button onClick={handleImport} style={{ color: 'var(--primary)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, minHeight: 44 }} aria-label="Import from backup">
              Import from backup
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Premium</div>
          <div className="settings-item">
            <label>{settings.isPremium ? '✅ Premium unlocked' : 'Free plan'}</label>
            {!settings.isPremium && (
              <button onClick={() => navigate('premium')} style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, minHeight: 44 }} aria-label="Upgrade to premium">
                Upgrade
              </button>
            )}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">About</div>
          <div className="settings-item"><label>PlantPal v1.0.0</label></div>
          <div className="settings-item">
            <button style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, minHeight: 44 }} aria-label="Privacy policy">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
