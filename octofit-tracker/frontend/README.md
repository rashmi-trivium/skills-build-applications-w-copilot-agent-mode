# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application. It uses Vite, Bootstrap, and `react-router-dom` to render users, teams, activities, leaderboard, and workout suggestion pages.

## Environment

Define `VITE_CODESPACE_NAME` before running the frontend in GitHub Codespaces. A local `.env.local` file is a convenient place to set it:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests are sent to:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `VITE_API_BASE_URL` when provided, or `http://localhost:8000/api` for local development. This avoids accidental `https://undefined-8000.app.github.dev` requests.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
