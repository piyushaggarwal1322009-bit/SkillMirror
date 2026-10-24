# Development Guide

## Status

The repository currently contains a root-level React + Vite frontend prototype. The backend instructions below are future integration guidance only; no backend is implemented.

## Prerequisites

- Git
- Node.js 20+ and npm

## Frontend setup

```bash
npm install
npm run dev
```

Run automated checks with `npm test` and `npm run build`. The frontend has no required environment variables. User guides and practice records are stored in browser `localStorage`.

## Future backend setup

When a backend is added, document its real entry point, dependencies, and environment variables here. Never place private AI-provider credentials in frontend `VITE_` variables.

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
