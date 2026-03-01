import React from 'react';
import { updateSettings } from '../db';

export default function Premium({ settings, refreshSettings, navigate }) {
  const handlePurchase = async () => {
    // In production, this would use RevenueCat / Google Play Billing
    // For MVP, we stub the purchase flow
    await updateSettings({ isPremium: true });
    await refreshSettings();
    navigate('home');
  };

  const handleRestore = async () => {
    // Stub: would check RevenueCat for existing purchase
    await updateSettings({ isPremium: true });
    await refreshSettings();
    navigate('home');
  };

  return (
    <div className="screen" role="main" aria-label="Premium upgrade">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('home')} aria-label="Back">←</button>
        <h1>Premium</h1>
        <div style={{ width: 44 }} />
      </div>

      <div style={{ padding: '0 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, margin: '24px 0 16px' }} aria-hidden="true">🌿</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Grow your collection</h2>

        <ul style={{ listStyle: 'none', textAlign: 'left', margin: '24px 0', fontSize: 16 }}>
          <li style={{ padding: '8px 0' }}>✅ Unlimited plants</li>
          <li style={{ padding: '8px 0' }}>✅ Species care guides</li>
          <li style={{ padding: '8px 0' }}>✅ Seasonal adjustments</li>
          <li style={{ padding: '8px 0' }}>✅ Plant health insights</li>
          <li style={{ padding: '8px 0' }}>✅ Photo journal</li>
          <li style={{ padding: '8px 0' }}>✅ Custom app icons</li>
        </ul>

        <button className="btn-primary" onClick={handlePurchase} aria-label="Unlock all features for $2.99">
          Unlock All — $2.99
        </button>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '8px 0 4px' }}>One-time purchase</p>
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: '12px 0 24px' }}>No subscription. Ever. 🎉</p>

        <button className="btn-text" onClick={handleRestore} aria-label="Restore previous purchase">
          Restore Purchase
        </button>
      </div>
    </div>
  );
}
