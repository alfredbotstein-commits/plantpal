import React, { useEffect, useState } from 'react';

export default function WateredAnimation({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone && onDone();
    }, 800);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="watered-overlay" role="status" aria-label="Plant watered successfully">
      <span className="watered-check">💧✅</span>
    </div>
  );
}
