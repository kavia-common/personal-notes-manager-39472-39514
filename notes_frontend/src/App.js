import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './theme.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import { sampleNotes } from './utils/sampleData';
import { getEnvConfig } from './utils/envConfig';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application for the Ocean Notes UI.
   * Provides a two-pane layout with a sidebar NotesList and a main NoteEditor.
   * State is in-memory for now; if a backend URL is configured we still operate locally
   * but show readiness in the header. An API service can be added later without breaking UI.
   */
  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const env = getEnvConfig();
  const backendConfigured = Boolean(env.API_BASE || env.BACKEND_URL);

  // Initialize with sample data
  useEffect(() => {
    // For now we just load sample data; later, check backendConfigured to fetch.
    setNotes(sampleNotes);
    setSelectedId(sampleNotes[0]?.id || null);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId),
    [notes, selectedId]
  );

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // PUBLIC_INTERFACE
  const createNote = () => {
    const id = `n-${Date.now()}`;
    const now = new Date().toISOString();
    const newNote = {
      id,
      title: 'Untitled',
      body: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const selectNote = (id) => {
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const updateNote = (updated) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) {
      // Select next available note
      setSelectedId((prevSelected) => {
        const remaining = notes.filter((n) => n.id !== id);
        return remaining[0]?.id || null;
      });
    }
  };

  // PUBLIC_INTERFACE
  const saveNote = () => {
    // No-op for now; placeholder for backend integration.
    // We could show a subtle saved indicator in future.
  };

  return (
    <div className={`App ${theme}`}>
      <Header onNewNote={createNote} />
      <main className="main">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          onSelect={selectNote}
          onDelete={deleteNote}
          onCreate={createNote}
        />
        <NoteEditor note={selectedNote} onChange={updateNote} onSave={saveNote} />
      </main>

      <button
        className="floating-theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <footer className="footer" aria-label="Footer">
        <div className="env-hint">
          <span>Theme: {theme}</span>
          <span className="dot-sep">•</span>
          <span>
            Mode: {backendConfigured ? 'Backend-ready (local session)' : 'Local session'}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
