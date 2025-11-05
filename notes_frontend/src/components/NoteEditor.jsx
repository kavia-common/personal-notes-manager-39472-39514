import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, onSave }) {
  /** Main editor pane to edit title and body. */
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setBody(note?.body || '');
  }, [note?.id]); // reset fields when switching notes

  useEffect(() => {
    if (!note) return;
    onChange({ ...note, title, body, updatedAt: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, body]);

  if (!note) {
    return (
      <section className="editor empty-state" aria-live="polite">
        <div className="placeholder-card">
          <div className="placeholder-icon">🌊</div>
          <h2>Welcome to Ocean Notes</h2>
          <p>Select a note from the left or create a new one to get started.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="editor" aria-label="Note editor">
      <div className="editor-header">
        <input
          className="title-input"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <button className="btn primary" onClick={() => onSave?.()}>
          Save
        </button>
      </div>
      <textarea
        className="body-input"
        placeholder="Write your thoughts here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        aria-label="Note body"
      />
    </section>
  );
}
