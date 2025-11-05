# Ocean Notes – React Frontend

A simple web-based notes app with a modern Ocean Professional theme. Provides local, in-memory notes CRUD with a clean two‑pane layout. The app is ready for future backend integration using environment variables, but it functions entirely client-side if none are set.

## Features

- Two‑pane layout: sidebar list on the left, editor on the right
- Create, select, edit (title/body), and delete notes
- In‑memory state that persists during the session
- Sample data fallback when no backend is configured
- Ocean Professional theme: blue primary, amber accents, subtle shadows, rounded corners
- Responsive design for mobile (sidebar stacks above editor)
- Environment-aware (reads `REACT_APP_*` vars safely, no hardcoded URLs)

## Getting Started

In the project directory, you can run:

### `npm start`
Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser.

### `npm test`
Launches the test runner.

### `npm run build`
Builds the app for production to the `build` folder.

## Usage

- Click “+ New Note” (header or sidebar) to create a note.
- Select any note in the sidebar to edit it.
- Edit the title and body in the editor pane; changes update immediately in memory.
- Click the trash icon on a note in the list to delete it.
- Theme toggle button in the lower-right switches between light/dark.

## Environment Variables

The app reads, but does not require, these variables for future backend integration:

- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`
- `REACT_APP_FRONTEND_URL`
- `REACT_APP_WS_URL`
- `REACT_APP_NODE_ENV`
- `REACT_APP_NEXT_TELEMETRY_DISABLED`
- `REACT_APP_ENABLE_SOURCE_MAPS`
- `REACT_APP_PORT`
- `REACT_APP_TRUST_PROXY`
- `REACT_APP_LOG_LEVEL`
- `REACT_APP_HEALTHCHECK_PATH`
- `REACT_APP_FEATURE_FLAGS`
- `REACT_APP_EXPERIMENTS_ENABLED`

If `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL` is set, the header shows “Backend ready (not used)”. The UI still runs fully client-side and will not fail if the backend is unreachable.

You may create a `.env` file at the project root with any of the above variables. Do not commit secrets.

Example `.env`:
```
REACT_APP_API_BASE=https://api.example.com
REACT_APP_BACKEND_URL=https://api.example.com
```

## Design and Theme

- Theme colors are defined in `src/theme.css`.
- Styling follows the Ocean Professional palette:
  - Primary: `#2563EB`
  - Secondary: `#F59E0B`
  - Error: `#EF4444`
  - Background: `#f9fafb`
  - Surface: `#ffffff`
  - Text: `#111827`

Custom components:
- `Header` – app title, create button, backend status
- `NotesList` – searchable list with selection and delete
- `NoteEditor` – title and body editor

## Project Structure

```
src/
  components/
    Header.jsx
    NotesList.jsx
    NoteEditor.jsx
  utils/
    envConfig.js
    sampleData.js
  App.js
  App.css
  theme.css
  index.js
  index.css
```

## Future Backend Integration

- Add an API service layer (e.g., `src/services/notesApi.js`) using `getEnvConfig()` from `src/utils/envConfig.js`.
- Gate network calls behind checks for configured URLs and fall back to local state.
- Keep the UI resilient: never block rendering or crash on fetch errors.

