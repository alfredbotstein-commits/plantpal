import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, markWatered, snoozePlant, deletePlant } from '../db';
import { getPlantStatus, formatDate, getSpeciesIcon } from '../utils';
import { getSpeciesByName } from '../speciesData';
import WateredAnimation from '../components/WateredAnimation';

export default function PlantDetail({ plantId, navigate, settings }) {
  const [watered, setWatered] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSnooze, setShowSnooze] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logType, setLogType] = useState('watered');
  const [logNote, setLogNote] = useState('');

  const plant = useLiveQuery(() => db.plants.get(plantId), [plantId]);
  const entries = useLiveQuery(() =>
    db.healthEntries.where('plantId').equals(plantId).reverse().sortBy('date'),
    [plantId]
  ) || [];

  if (!plant) return <div className="screen"><p style={{ textAlign: 'center', padding: 40 }}>Plant not found</p></div>;

  const { status, text } = getPlantStatus(plant);
  const speciesInfo = plant.species ? getSpeciesByName(plant.species) : null;
  const icon = getSpeciesIcon(plant.species);

  const handleWater = async () => {
    await markWatered(plantId);
    setWatered(true);
  };

  const handleSnooze = async (days) => {
    await snoozePlant(plantId, days);
    setShowSnooze(false);
  };

  const handleDelete = async () => {
    await deletePlant(plantId);
    navigate('home');
  };

  const handleAddLog = async () => {
    await db.healthEntries.add({
      plantId,
      date: new Date().toISOString(),
      type: logType,
      note: logNote || null,
      photoURL: null
    });
    setShowLog(false);
    setLogNote('');
  };

  const logIcons = { watered: '💧', repotted: '🌱', pest: '🐛', pruned: '✂️', fertilized: '🧪', note: '📝' };

  return (
    <div style={{ paddingBottom: 40 }} role="main" aria-label={`${plant.name} details`}>
      <div className="detail-hero">
        <span aria-hidden="true">{icon}</span>
        <div className="detail-hero-actions">
          <button className="detail-hero-btn" onClick={() => navigate('home')} aria-label="Back">←</button>
          <button className="detail-hero-btn" onClick={() => navigate('edit', plantId)} aria-label="Edit plant">✏️</button>
        </div>
        <div className="detail-hero-overlay">
          <h2>{plant.name}</h2>
          {plant.species && <p>{plant.species}</p>}
        </div>
      </div>

      <div className="status-card">
        <div className="label">💧 Next watering</div>
        <div className="value" style={{ color: status === 'overdue' ? 'var(--red-500)' : status === 'due' ? 'var(--amber-500)' : 'inherit' }}>
          {text} {plant.nextWateringDate && `· ${formatDate(plant.nextWateringDate)}`}
        </div>
        <div className="sub">Every {plant.wateringIntervalDays || 7} days</div>
        <div className="actions">
          <button className="btn-primary" onClick={handleWater} aria-label="Mark as watered">💧 Mark as Watered</button>
          <button className="btn-outline" onClick={() => setShowSnooze(true)} aria-label="Snooze reminder">⏰ Snooze</button>
        </div>
      </div>

      {speciesInfo && (
        <div className="care-info" role="region" aria-label="Care information">
          <h3 style={{ fontSize: 17, fontWeight: 600 }}>Care Guide</h3>
          <div className="care-row"><span className="icon" aria-hidden="true">☀️</span> {speciesInfo.light}</div>
          <div className="care-row"><span className="icon" aria-hidden="true">💨</span> {speciesInfo.humidity}</div>
          <div className="care-row"><span className="icon" aria-hidden="true">🌡️</span> {speciesInfo.tempMin}–{speciesInfo.tempMax}°F</div>
          {speciesInfo.careNotes && <div className="care-row" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{speciesInfo.careNotes}</div>}
          {speciesInfo.summerWateringDays && (
            <div className="care-row">
              <span className="icon" aria-hidden="true">☀️</span> Summer: every {speciesInfo.summerWateringDays} days
              {!settings.isPremium && <span className="premium-badge" onClick={() => navigate('premium')}>PRO</span>}
            </div>
          )}
          {speciesInfo.winterWateringDays && (
            <div className="care-row">
              <span className="icon" aria-hidden="true">❄️</span> Winter: every {speciesInfo.winterWateringDays} days
              {!settings.isPremium && <span className="premium-badge" onClick={() => navigate('premium')}>PRO</span>}
            </div>
          )}
        </div>
      )}

      {plant.location && (
        <div style={{ padding: '8px 16px', fontSize: 14, color: 'var(--text-secondary)' }}>
          📍 {plant.location}
        </div>
      )}

      <div className="section-header">
        <h3>Health Log</h3>
        <button className="top-bar-btn" style={{ width: 36, height: 36, minWidth: 36, minHeight: 36, fontSize: 18 }} onClick={() => setShowLog(true)} aria-label="Add health log entry">+</button>
      </div>

      {entries.length === 0 ? (
        <p style={{ padding: '0 16px', color: 'var(--text-secondary)', fontSize: 14 }}>No entries yet. Water your plant to start tracking!</p>
      ) : (
        entries.slice(0, 20).map(e => (
          <div key={e.id} className="log-entry">
            <span className="icon" aria-hidden="true">{logIcons[e.type] || '📝'}</span>
            <div className="content">
              <div className="type">{e.type.charAt(0).toUpperCase() + e.type.slice(1)}</div>
              <div className="date">{formatDate(e.date)}{e.note && ` · ${e.note}`}</div>
            </div>
          </div>
        ))
      )}

      <div style={{ padding: 16, marginTop: 24 }}>
        <button className="btn-danger" onClick={() => setShowDelete(true)} aria-label="Delete plant">Delete Plant</button>
      </div>

      {showDelete && (
        <div className="modal-backdrop" onClick={() => setShowDelete(false)} role="dialog" aria-label="Delete confirmation">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Delete {plant.name}?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>This will remove the plant and all its history.</p>
            <button className="btn-primary" style={{ background: 'var(--red-500)' }} onClick={handleDelete}>Delete</button>
            <button className="btn-outline" style={{ marginTop: 8 }} onClick={() => setShowDelete(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showSnooze && (
        <div className="modal-backdrop" onClick={() => setShowSnooze(false)} role="dialog" aria-label="Snooze options">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Snooze Reminder</h3>
            <div className="flex-col gap-8">
              <button className="btn-outline" onClick={() => handleSnooze(1)}>1 day</button>
              <button className="btn-outline" onClick={() => handleSnooze(3)}>3 days</button>
              <button className="btn-outline" onClick={() => handleSnooze(7)}>1 week</button>
            </div>
          </div>
        </div>
      )}

      {showLog && (
        <div className="modal-backdrop" onClick={() => setShowLog(false)} role="dialog" aria-label="Add health log entry">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add Health Log Entry</h3>
            <div className="form-group">
              <label className="form-label" htmlFor="log-type">Type</label>
              <select id="log-type" className="form-select" value={logType} onChange={e => setLogType(e.target.value)}>
                <option value="watered">💧 Watered</option>
                <option value="repotted">🌱 Repotted</option>
                <option value="pest">🐛 Pest Issue</option>
                <option value="pruned">✂️ Pruned</option>
                <option value="fertilized">🧪 Fertilized</option>
                <option value="note">📝 Note</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="log-note">Note (optional)</label>
              <input id="log-note" className="form-input" value={logNote} onChange={e => setLogNote(e.target.value)} placeholder="Add a note..." maxLength={500} />
            </div>
            <button className="btn-primary" onClick={handleAddLog}>Add Entry</button>
          </div>
        </div>
      )}

      {watered && <WateredAnimation onDone={() => setWatered(false)} />}
    </div>
  );
}
