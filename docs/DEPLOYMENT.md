# Deployment Guide

This is a deployment checklist, not a statement that SkillMirror is deployed or production-ready. The current backend is a local development implementation.

## Deployment shape

- Static host for the Vite frontend.
- Node.js 20+ host for the Express API.
- Managed PostgreSQL for Prisma data.
- Private durable object storage before handling production media.
- Server-side secret management for database credentials.

## Frontend

1. Set `VITE_API_BASE_URL` to the public HTTPS API base URL. Vite embeds it in the client bundle; it must not contain secrets.
2. Build with `npm run build:frontend` and serve `dist/`.
3. Verify SPA refresh/deep-link behavior and the API workspace against the deployed API.

## Backend

1. Configure `DATABASE_URL`, `PORT`, `NODE_ENV`, `FRONTEND_ORIGIN`, and `MEDIA_STORAGE_DIR` using the host's server-side environment/secret manager. See `backend/.env.example`.
2. Run `npm run db:generate` and `npm run db:deploy` as a release migration step.
3. Start with `npm run build:backend` followed by `npm run start:backend`.
4. Use HTTPS so production cookies can be `Secure`; set `FRONTEND_ORIGIN` to the exact frontend origin.
5. Monitor `/api/v1/health` for liveness and `/api/v1/ready` for database readiness.

## Production gaps

- Local media storage is not durable on ephemeral hosts, has no malware scanner, and has no retention/deletion scheduler. Implement a private object-storage adapter and cleanup policy before accepting production uploads.
- Registration and login have in-process rate limits; production should use shared rate limiting behind the trusted proxy and abuse monitoring.
- No external AI or computer-vision integration is configured. The sample generator is deterministic and labelled.
- Add database backups, restore drills, TLS, metrics, alerting, and operational incident procedures.
- Review privacy/consent, retention, account deletion, and safety requirements with qualified stakeholders.

Do not describe local execution as deployment or human review as AI verification.