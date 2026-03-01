import React, { useState } from 'react';

const slides = [
  { icon: '📱🌿', title: 'Never forget to water again.', desc: "We'll remind you exactly when each plant needs water." },
  { icon: '🌿🟢🟡🔴', title: 'Track all your plants in one place.', desc: 'See at a glance which plants need attention today.' },
  { icon: '🌱✨', title: 'Species-specific care. No subscription.', desc: '500+ plant species. One-time purchase. Forever yours.' }
];

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);

  return (
    <div className="onboarding" role="region" aria-label="Welcome to PlantPal">
      <div className="illustration" aria-hidden="true">{slides[step].icon}</div>
      <h2>{slides[step].title}</h2>
      <p>{slides[step].desc}</p>
      <div className="onboarding-dots" aria-hidden="true">
        {slides.map((_, i) => (
          <div key={i} className={`onboarding-dot ${i === step ? 'active' : ''}`} />
        ))}
      </div>
      {step < slides.length - 1 ? (
        <button className="btn-primary" onClick={() => setStep(step + 1)} style={{ maxWidth: 280 }} aria-label="Next">
          Next
        </button>
      ) : (
        <button className="btn-primary" onClick={onDone} style={{ maxWidth: 280 }} aria-label="Add your first plant">
          Add Your First Plant 🌱
        </button>
      )}
      {step < slides.length - 1 && (
        <button className="btn-text" onClick={onDone} aria-label="Skip onboarding">Skip</button>
      )}
    </div>
  );
}
