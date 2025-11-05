import React, { useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  onCreate,
}) {
  /** Sidebar list of notes with search and basic actions. */
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => {
      const t = (n.title || '').toLowerCase();
      const b = (n.body || '').toLowerCase();
      return t.includes(q) || b.includes(q);
    });
  }, [notes, query]);

  return (
    <aside className="sidebar" aria-label="Notes list and actions">
      <div className="sidebar-header">
        <input
          type="search"
          className="search"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
        <button className="btn secondary" onClick={onCreate} aria-label="Create note">
          + New
        </button>
      </div>

      <ul className="notes-list" role="listbox" aria-label="Notes">
        {filtered.length === 0 ? (
          <li className="empty">No notes found.</li>
        ) : (
          filtered.map((note) => (
            <li
              key={note.id}
              className={`note-item ${note.id === selectedId ? 'active' : ''}`}
              onClick={() => onSelect(note.id)}
              role="option"
              aria-selected={note.id === selectedId}
            >
              <div className="note-title">{note.title || 'Untitled'}</div>
              <div className="note-snippet">
                {note.body ? note.body.slice(0, 80) : 'No content yet...'}
              </div>
              <button
                className="icon-btn delete"
                title="Delete note"
                aria-label={`Delete note ${note.title || 'Untitled'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
              >
                🗑
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
