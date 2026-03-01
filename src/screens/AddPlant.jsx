import React, { useState } from 'react';
import { addPlant, getSettings } from '../db';
import { searchSpecies, getPopularSpecies } from '../speciesData';
import { LOCATIONS, FREE_PLANT_LIMIT } from '../utils';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import ConfettiAnimation from '../components/ConfettiAnimation';

export default function AddPlant({ navigate, settings }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [species, setSpecies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [interval, setInterval] = useState(7);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [firstWater, setFirstWater] = useState('today');
  const [showConfetti, setShowConfetti] = useState(false);

  const plantCount = useLiveQuery(() => db.plants.count()) || 0;

  const speciesResults = searchQuery.length >= 2 ? searchSpecies(searchQuery) : [];
  const popular = getPopularSpecies();

  const handleSelectSpecies = (s) => {
    setSpecies(s);
    setInterval(s.wateringDays);
    setStep(3);
  };

  const handleDone = async () => {
    if (!settings.isPremium && plantCount >= FREE_PLANT_LIMIT) {
      navigate('premium');
      return;
    }
    if (!name.trim()) return;

    const now = new Date();
    let nextDate;
    if (firstWater === 'today') {
      nextDate = now;
    } else if (firstWater === 'tomorrow') {
      nextDate = new Date(now);
      nextDate.setDate(nextDate.getDate() + 1);
    } else {
      nextDate = new Date(now);
      nextDate.setDate(nextDate.getDate() + interval);
    }

    await addPlant({
      name: name.trim(),
      species: species?.commonName || null,
      location: location || null,
      wateringIntervalDays: interval,
      summerIntervalDays: species?.summerWateringDays || null,
      winterIntervalDays: species?.winterWateringDays || null,
      reminderTime,
      lastWateredDate: firstWater === 'today' ? now.toISOString() : null,
      nextWateringDate: nextDate.toISOString(),
    });

    setShowConfetti(true);
  };

  if (showConfetti) {
    return <ConfettiAnimation onDone={() => navigate('home')} />;
  }

  return (
    <div className="screen" role="main" aria-label="Add Plant">
      <div className="top-bar">
        <button className="back-btn" onClick={() => step > 1 ? setStep(step - 1) : navigate('home')} aria-label="Back">←</button>
        <h1>Add Plant</h1>
        <span className="step-indicator">{step}/3</span>
      </div>

      {step === 1 && (
        <div style={{ padding: '0 16px' }}>
          <div className="form-group" style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ width: 100, height: 100, borderRadius: 16, background: 'var(--green-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }} aria-hidden="true">
              📷
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>Photo (optional)</p>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="plant-name">Plant Name</label>
            <input
              id="plant-name"
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="My Monstera"
              maxLength={100}
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location (optional)</label>
            <div className="chip-group">
              {LOCATIONS.map(loc => (
                <button
                  key={loc}
                  className={`chip ${location === loc ? 'active' : ''}`}
                  onClick={() => setLocation(location === loc ? '' : loc)}
                  aria-pressed={location === loc}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary mt-16" onClick={() => name.trim() ? setStep(2) : null} disabled={!name.trim()} aria-label="Next step">Next</button>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: '0 16px' }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>What kind of plant?</h2>
          <div className="form-group">
            <input
              className="form-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="🔍 Search species..."
              aria-label="Search plant species"
            />
          </div>
          {searchQuery.length >= 2 ? (
            <ul className="species-list" role="listbox" aria-label="Search results">
              {speciesResults.map((s, i) => (
                <li key={i} className={`species-item ${species?.commonName === s.commonName ? 'selected' : ''}`} onClick={() => handleSelectSpecies(s)} role="option" aria-selected={species?.commonName === s.commonName}>
                  <span className="icon" aria-hidden="true">{s.icon}</span>
                  <div>
                    <div className="name">{s.commonName}</div>
                    <div className="sci">{s.scientificName}</div>
                  </div>
                </li>
              ))}
              {speciesResults.length === 0 && <p style={{ color: 'var(--text-secondary)', padding: 16 }}>No species found</p>}
            </ul>
          ) : (
            <>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Popular:</p>
              <ul className="species-list" role="listbox" aria-label="Popular species">
                {popular.map((s, i) => (
                  <li key={i} className="species-item" onClick={() => handleSelectSpecies(s)} role="option">
                    <span className="icon" aria-hidden="true">{s.icon}</span>
                    <div>
                      <div className="name">{s.commonName}</div>
                      <div className="sci">{s.scientificName}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button className="btn-text" style={{ width: '100%', marginTop: 12 }} onClick={() => setStep(3)} aria-label="Skip species selection">
            Skip — I'll set my own schedule
          </button>
        </div>
      )}

      {step === 3 && (
        <div style={{ padding: '0 16px' }}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>How often should we remind you?</h2>
          <div className="form-group">
            <label className="form-label" htmlFor="interval">Watering interval</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Every</span>
              <input
                id="interval"
                type="number"
                className="form-input"
                style={{ width: 80, textAlign: 'center' }}
                value={interval}
                onChange={e => setInterval(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
                min={1}
                max={60}
                aria-label="Watering interval in days"
              />
              <span>days</span>
            </div>
          </div>

          {species && (
            <div style={{ background: 'var(--green-100)', padding: 12, borderRadius: 12, marginBottom: 16, fontSize: 14 }}>
              <div>☀️ Summer: every {species.summerWateringDays} days</div>
              <div>❄️ Winter: every {species.winterWateringDays} days</div>
              {!settings.isPremium && <span className="premium-badge" style={{ marginTop: 4 }}>PRO — seasonal auto-adjust</span>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="reminder-time">Remind me at</label>
            <input id="reminder-time" type="time" className="form-input" value={reminderTime} onChange={e => setReminderTime(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">First watering</label>
            {['today', 'tomorrow', 'later'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', minHeight: 44, cursor: 'pointer' }}>
                <input type="radio" name="firstWater" value={opt} checked={firstWater === opt} onChange={e => setFirstWater(e.target.value)} />
                {opt === 'today' ? 'Today' : opt === 'tomorrow' ? 'Tomorrow' : `In ${interval} days`}
              </label>
            ))}
          </div>

          <button className="btn-primary mt-16" onClick={handleDone} aria-label="Add plant">Done — Add Plant 🌱</button>
        </div>
      )}
    </div>
  );
}
