import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 48, marginBottom: 16 }}>🌱</span>
          <h2 style={{ marginBottom: 8 }}>Something went wrong</h2>
          <p style={{ color: '#A8A29E', marginBottom: 16 }}>PlantPal encountered an error.</p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); }}
            style={{ padding: '12px 24px', background: '#16A34A', color: 'white', borderRadius: 12, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer', minHeight: 56, minWidth: 120 }}
            aria-label="Try again"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
