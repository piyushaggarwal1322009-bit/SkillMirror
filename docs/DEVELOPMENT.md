# Development Guide

## Status

This guide describes the intended development layout from the README. Confirm the real repository folders and package scripts before running commands. Do not create empty features solely to match this document.

## Prerequisites

- Git
- Node.js and npm (use the version supported by the frontend's `package.json`)
- Python 3.10+ (use the version pinned by the backend if one exists)
- Optional AI provider credentials for genuine model inference

## Suggested local setup

### Backend

From the repository root:

```bash
cd backend
python -m venv .venv
```

Activate the environment:

```powershell
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

```bash
# macOS / Linux
source .venv/bin/activate
```

Then, if `backend/requirements.txt` and `backend/app/main.py` exist:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

If those files or the import path differ, use the actual project configuration.

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Set `VITE_API_BASE_URL` in the frontend environment file, for example:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend using the script configured in `package.json`, commonly:

```bash
npm run dev
```

## Environment variables

- Frontend variables beginning with `VITE_` are exposed to the browser. Never put private API keys in them.
- Backend secrets should be loaded on the server from environment variables or a secret manager.
- Commit `.env.example` files with placeholder values only; ignore local `.env` files.
- Document required variables alongside the service that uses them.

## Recommended implementation sequence

1. Define task, procedure, checkpoint, attempt, and evaluation schemas.
2. Build a task library and instructor-editable procedure editor using fixture data.
3. Implement media upload validation and processing status.
4. Add frame extraction and draft step generation behind an interface.
5. Require instructor approval and version the approved procedure.
6. Implement one deterministic checkpoint evaluator for a simple, low-risk task.
7. Add `unable_to_verify` handling and evidence-linked feedback.
8. Persist attempts and show progress.
9. Add one genuine AI inference path, with a clearly labeled fallback/mock for local demos if needed.
10. Test the whole flow end to end before adding more task types.

## Code conventions

- Keep UI components small and state transitions explicit.
- Keep provider-specific calls out of route handlers and UI components.
- Validate external inputs at system boundaries.
- Represent evaluation status with a documented enum, not free-form strings.
- Prefer clear errors to silent fallbacks.
- Mark simulated output as simulated in both code and interface.
- Add regression tests for every discovered evaluation failure.

## Before opening a pull request

Follow the [contributing guide](../CONTRIBUTING.md) and run the checks available in the current project. Report commands actually run; do not claim checks pass if they were not executed.
