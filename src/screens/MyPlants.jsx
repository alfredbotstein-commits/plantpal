import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, markWatered } from '../db';
import { getPlantStatus, FREE_PLANT_LIMIT, getSpeciesIcon } from '../utils';
import WateredAnimation from '../components/WateredAnimation';

export default function MyPlants({ navigate, settings }) {
  const [watered, setWatered] = useState(false);
  const plants = useLiveQuery(() => db.plants.toArray()) || [];

  const sorted = [...plants].sort((a, b) => {
    const sa = getPlantStatus(a);
    const sb = getPlantStatus(b);
    const order = { overdue: 0, due: 1, healthy: 2 };
    if (order[sa.status] !== order[sb.status]) return order[sa.status] - order[sb.status];
    return sa.days - sb.days;
  });

  const overdue = sorted.filter(p => getPlantStatus(p).status === 'overdue').length;
  const due = sorted.filter(p => getPlantStatus(p).status === 'due').length;

  const handleWater = async (e, plantId) => {
    e.stopPropagation();
    await markWatered(plantId);
    setWatered(true);
  };

  const handleAdd = () => {
    if (!settings.isPremium && plants.length >= FREE_PLANT_LIMIT) {
      navigate('premium');
    } else {
      navigate('add');
    }
  };

  return (
    <div className="screen" role="main" aria-label="My Plants">
      <div className="top-bar">
        <h1>PlantPal</h1>
        <button className="top-bar-btn" onClick={handleAdd} aria-label="Add plant">+</button>
      </div>

      {plants.length > 0 && (overdue > 0 || due > 0) && (
        <div className={`summary-banner ${overdue > 0 ? 'overdue' : 'due'}`} role="status" aria-label="Watering summary">
          💧 {due > 0 && `${due} need water today`}{due > 0 && overdue > 0 && ' · '}{overdue > 0 && `${overdue} overdue`}
        </div>
      )}

      {plants.length === 0 ? (
        <div className="empty-state">
          <div className="icon" aria-hidden="true">🪴</div>
          <h2>Add your first plant</h2>
          <p>We'll remind you exactly when to water.</p>
          <button className="btn-primary" onClick={() => navigate('add')} style={{ maxWidth: 240 }} aria-label="Add plant">
            Add Plant
          </button>
        </div>
      ) : (
        <>
          <div className="plant-grid">
            {sorted.map(plant => {
              const { status, text } = getPlantStatus(plant);
              return (
                <div
                  key={plant.id}
                  className={`plant-card ${status === 'overdue' ? 'overdue' : ''}`}
                  onClick={() => navigate('detail', plant.id)}
                  role="button"
                  aria-label={`${plant.name}, ${text}`}
                  tabIndex={0}
                >
                  <div className="plant-card-photo" aria-hidden="true">
                    {getSpeciesIcon(plant.species)}
                  </div>
                  <div className="plant-card-info">
                    <div className="plant-card-name">
                      <span className={`status-dot ${status}`} aria-label={status} />
                      {plant.name}
                    </div>
                    <div className={`plant-card-schedule ${status === 'overdue' ? 'overdue' : ''}`}>
                      {text}
                    </div>
                    {(status === 'due' || status === 'overdue') && (
                      <button
                        className="water-btn-small"
                        onClick={(e) => handleWater(e, plant.id)}
                        aria-label={`Water ${plant.name}`}
                      >
                        💧 Water
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!settings.isPremium && plants.length >= FREE_PLANT_LIMIT && (
            <div className="premium-banner" style={{ margin: '16px' }}>
              <p style={{ fontSize: 14 }}>
                🌿 You've got {plants.length} plants! <button onClick={() => navigate('premium')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>Unlock unlimited for $2.99</button>
              </p>
            </div>
          )}
        </>
      )}

      {watered && <WateredAnimation onDone={() => setWatered(false)} />}
    </div>
  );
}
