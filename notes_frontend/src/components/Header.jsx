import React from 'react';
import { getEnvConfig } from '../utils/envConfig';

// PUBLIC_INTERFACE
export default function Header({ onNewNote }) {
  /** Header/Nav component with app title, new note button, and backend status indicator. */
  const env = getEnvConfig();
  const backendConfigured = Boolean(env.API_BASE || env.BACKEND_URL);

  return (
    <header
      className="header"
      role="banner"
      aria-label="Application Header and Navigation"
    >
      <div className="brand">
        <div className="logo" aria-hidden="true">📝</div>
        <div className="titles">
          <h1 className="app-title">Ocean Notes</h1>
          <p className="app-subtitle">Capture ideas. Organize thoughts. Stay focused.</p>
        </div>
      </div>

      <div className="header-actions">
        <button className="btn primary" onClick={onNewNote} aria-label="Create new note">
          + New Note
        </button>
        <div
          className={`backend-status ${backendConfigured ? 'ok' : 'warn'}`}
          title={
            backendConfigured
              ? 'Backend URL configured. API integration can be enabled later.'
              : 'No backend configured. Operating in local session mode.'
          }
          aria-live="polite"
        >
          <span className="dot" />
          <span className="status-text">
            {backendConfigured ? 'Backend ready (not used)' : 'Local session'}
          </span>
        </div>
      </div>
    </header>
  );
}
