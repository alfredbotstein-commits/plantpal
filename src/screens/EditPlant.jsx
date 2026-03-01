import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { LOCATIONS } from '../utils';

export default function EditPlant({ plantId, navigate }) {
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [interval, setInterval] = useState(7);

  useEffect(() => {
    db.plants.get(plantId).then(p => {
      if (p) {
        setPlant(p);
        setName(p.name);
        setLocation(p.location || '');
        setInterval(p.wateringIntervalDays || 7);
      }
    });
  }, [plantId]);

  if (!plant) return null;

  const handleSave = async () => {
    if (!name.trim()) return;
    const next = new Date(plant.lastWateredDate || new Date());
    next.setDate(next.getDate() + interval);
    await db.plants.update(plantId, {
      name: name.trim(),
      location: location || null,
      wateringIntervalDays: interval,
      nextWateringDate: next.toISOString()
    });
    navigate('detail', plantId);
  };

  return (
    <div className="screen" role="main" aria-label="Edit plant">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('detail', plantId)} aria-label="Back">←</button>
        <h1>Edit Plant</h1>
        <div style={{ width: 44 }} />
      </div>
      <div style={{ padding: '0 16px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="edit-name">Plant Name</label>
          <input id="edit-name" className="form-input" value={name} onChange={e => setName(e.target.value)} maxLength={100} aria-required="true" />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <div className="chip-group">
            {LOCATIONS.map(loc => (
              <button key={loc} className={`chip ${location === loc ? 'active' : ''}`} onClick={() => setLocation(location === loc ? '' : loc)} aria-pressed={location === loc}>
                {loc}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="edit-interval">Watering every</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input id="edit-interval" type="number" className="form-input" style={{ width: 80, textAlign: 'center' }} value={interval} onChange={e => setInterval(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))} min={1} max={60} />
            <span>days</span>
          </div>
        </div>
        <button className="btn-primary mt-16" onClick={handleSave} aria-label="Save changes">Save Changes</button>
      </div>
    </div>
  );
}
