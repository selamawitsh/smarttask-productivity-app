# SmartTask — Productivity App

SmartTask is a minimal productivity template that demonstrates a small Django API backend and a simple plain-HTML frontend. It is intended as a lightweight starting point for experimenting with task features.

Key points

- The backend is a Django project exposing a minimal JSON API at `/tasks/` (and `/tasks/<id>/`).
- The frontend has been simplified to plain HTML + JavaScript (`index.html` + `src/app.js`) so React is no longer required.
- A Docker Compose file is included to run services together for development.

Repository layout

```
smarttask-productivity-app/
├── code/
│   ├── backend/        # Django project (API)
│   └── frontend/       # Static frontend (index.html + src/app.js)
├── docs/               # architecture notes
├── docker-compose.yml
└── README.md
```

Quick start (recommended: Docker)

1. From the repository root run:

```powershell
cd smarttask-productivity-app
docker compose up --build
```

The backend will be available at http://localhost:8000 and the frontend at the port exposed by the frontend service (if configured in `docker-compose.yml`).

Run locally without Docker

Backend (Django)

```powershell
cd code\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1   # PowerShell
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Frontend (plain HTML)

Option A — Quick static preview (no build tools needed):

```powershell
cd code\frontend
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Option B — Use the existing Node/Vite tooling (optional):

```powershell
cd code\frontend
npm install
npm run dev
```

Notes about the frontend

- The static frontend is at `code/frontend/index.html` and uses `code/frontend/src/app.js` to fetch tasks from the backend.
- By default the frontend fetches `http://localhost:8000/tasks/`. If you run the backend on a different host/port, edit the `apiBase` value near the top of `code/frontend/src/app.js` or configure your dev server to provide `VITE_API_URL`.

API endpoints (minimal demo)

- `GET /tasks/` — returns a JSON array of sample tasks.
- `GET /tasks/<id>/` — returns a single task or 404.

