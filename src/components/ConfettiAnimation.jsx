import React, { useEffect, useState } from 'react';

const PIECES = ['🌿', '💧', '🌱', '🍃', '💦', '🌿', '💧', '🍀'];

export default function ConfettiAnimation({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone && onDone();
    }, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="confetti-overlay" aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        >
          {p}
        </span>
      ))}
    </div>
  );
}
