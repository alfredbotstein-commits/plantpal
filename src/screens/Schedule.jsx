import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, markWatered } from '../db';
import { getPlantStatus, formatFullDate, getSpeciesIcon } from '../utils';
import WateredAnimation from '../components/WateredAnimation';

export default function Schedule({ navigate }) {
  const [watered, setWatered] = useState(false);
  const plants = useLiveQuery(() => db.plants.toArray()) || [];

  // Generate next 14 days
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Group plants by day
  const schedule = days.map(day => {
    const dayStr = day.toDateString();
    const plantsForDay = plants.filter(p => {
      if (!p.nextWateringDate) return false;
      const nd = new Date(p.nextWateringDate);
      nd.setHours(0, 0, 0, 0);
      return nd.toDateString() === dayStr;
    });
    // Also include overdue plants on today
    const isToday = day.toDateString() === today.toDateString();
    if (isToday) {
      plants.forEach(p => {
        if (!p.nextWateringDate) return;
        const nd = new Date(p.nextWateringDate);
        nd.setHours(0, 0, 0, 0);
        if (nd < today && !plantsForDay.find(x => x.id === p.id)) {
          plantsForDay.push(p);
        }
      });
    }
    return { date: day, plants: plantsForDay };
  });

  const handleWater = async (plantId) => {
    await markWatered(plantId);
    setWatered(true);
  };

  return (
    <div className="screen" role="main" aria-label="Watering Schedule">
      <div className="top-bar">
        <h1>Schedule</h1>
      </div>

      <div className="calendar-strip" role="list" aria-label="Calendar">
        {days.map((day, i) => {
          const isToday = day.toDateString() === today.toDateString();
          const plantsForDay = schedule[i].plants;
          const hasOverdue = plantsForDay.some(p => getPlantStatus(p).status === 'overdue');
          const hasDue = plantsForDay.length > 0;
          return (
            <div key={i} className={`calendar-day ${isToday ? 'today' : ''}`} role="listitem" aria-label={`${dayNames[day.getDay()]} ${day.getDate()}, ${plantsForDay.length} plants`}>
              <span className="day-name">{dayNames[day.getDay()]}</span>
              <span className="day-num">{day.getDate()}</span>
              <div className="dots">
                {hasOverdue && <span className="dot-mini" style={{ background: 'var(--red-500)' }} />}
                {hasDue && !hasOverdue && <span className="dot-mini" style={{ background: isToday ? 'white' : 'var(--amber-500)' }} />}
              </div>
            </div>
          );
        })}
      </div>

      {schedule.filter(s => s.plants.length > 0).length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          <span style={{ fontSize: 40 }}>🌿</span>
          <p style={{ marginTop: 8 }}>No plants scheduled yet. Add a plant to get started!</p>
        </div>
      ) : (
        schedule.map((s, i) => {
          if (s.plants.length === 0) return null;
          const isToday = s.date.toDateString() === today.toDateString();
          return (
            <div key={i} className="schedule-section">
              <div className="schedule-date">{isToday ? 'Today' : formatFullDate(s.date.toISOString())}</div>
              {s.plants.map(plant => {
                const { status } = getPlantStatus(plant);
                return (
                  <div key={plant.id} className="schedule-item">
                    <span className="plant-icon" aria-hidden="true">{getSpeciesIcon(plant.species)}</span>
                    <span className="name" onClick={() => navigate('detail', plant.id)} style={{ cursor: 'pointer' }}>{plant.name}</span>
                    <button
                      className="water-btn-small"
                      style={{ width: 'auto', marginTop: 0 }}
                      onClick={() => handleWater(plant.id)}
                      aria-label={`Water ${plant.name}`}
                    >
                      💧 {status === 'overdue' ? 'Overdue' : 'Water'}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })
      )}

      {watered && <WateredAnimation onDone={() => setWatered(false)} />}
    </div>
  );
}
