# Deployment Guide

## Status

The steps below are a deployment checklist, not a statement that SkillMirror AI is currently deployed or production-ready. Adapt service names, commands, and paths to the actual repository.

## Deployment shape

A typical setup has:

- A static frontend host for the React/Vite build.
- A backend host that can run the Python API and media-processing dependencies.
- Private object storage for videos, images, and extracted frames.
- A database for tasks, procedure versions, attempts, and evaluations.
- Server-side secret management for any AI-provider keys.

Do not put provider credentials in frontend variables or public build artifacts.

## Frontend

1. Confirm the package manager and build scripts in `frontend/package.json`.
2. Configure `VITE_API_BASE_URL` to the deployed HTTPS API URL.
3. Build using the repository's configured script, commonly `npm run build`.
4. Serve the generated static output from the configured hosting platform.
5. Verify refresh/deep-link behavior and browser console output.

Vite environment variables are embedded into the client bundle at build time; treat all `VITE_*` values as public.

## Backend

1. Use a supported Python runtime and install pinned dependencies.
2. Configure the production start command to match the real ASGI application path.
3. Set secrets through the host's secret manager.
4. Configure allowed browser origins explicitly.
5. Set file-size and duration limits, timeouts, and rate limits.
6. Use durable, private media storage rather than relying on ephemeral local disk.
7. Add health checks, structured logs, and error monitoring without logging private media or secrets.

## Required configuration checklist

- `VITE_API_BASE_URL`: public HTTPS URL for the API.
- Backend AI provider key: server-side secret only, if genuine model inference is enabled.
- Allowed frontend origins: explicit list of deployed domains.
- Database URL and credentials: server-side secrets.
- Media storage credentials: server-side secrets with least-privilege access.
- Retention/deletion configuration: documented and tested.

Use actual variable names implemented by the repository; the names above are illustrative.

## Pre-launch checklist

- [ ] Frontend and backend origins use HTTPS.
- [ ] CORS is restricted to expected origins.
- [ ] Auth and per-resource authorization are implemented and tested.
- [ ] Upload validation and resource limits are enabled.
- [ ] Media is private by default.
- [ ] Deletion covers original uploads and derived artifacts.
- [ ] No secrets are in Git or frontend build output.
- [ ] Database backups and recovery expectations are documented.
- [ ] Logging and monitoring avoid personal data.
- [ ] AI failures and `unable_to_verify` outcomes have understandable UI states.
- [ ] The interface clearly states that results are not safety certification.

## Rollback

Keep a previous known-good release or commit. If a new release causes erroneous evaluations, data exposure, or upload failures, disable the affected feature or roll back rather than continuing to show potentially misleading outcomes.
