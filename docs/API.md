# API Design (Proposed)

> This is a design document for the MVP. Routes and schemas are not guaranteed to exist until implemented and tested in the repository.

## Conventions

- Base URL for local development: `http://localhost:8000`.
- Use JSON for metadata and multipart form data for media uploads.
- Validate every request on the server.
- Enforce authentication/authorization before exposing private tasks, submissions, or media.
- Use stable error codes and do not return raw stack traces or secrets.
- Set explicit upload size and media-duration limits.

## Endpoints

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/health` | Liveness check; no private data |
| `POST` | `/tasks` | Create a task draft |
| `GET` | `/tasks` | List tasks visible to the caller |
| `GET` | `/tasks/{task_id}` | Fetch task metadata and status |
| `POST` | `/tasks/{task_id}/demonstrations` | Upload a demonstration video |
| `GET` | `/tasks/{task_id}/processing-status` | Poll media processing status |
| `POST` | `/tasks/{task_id}/draft-procedure` | Generate a draft from processed media |
| `PUT` | `/tasks/{task_id}/procedure` | Save an instructor-reviewed procedure version |
| `POST` | `/tasks/{task_id}/attempts` | Submit checkpoint evidence |
| `GET` | `/tasks/{task_id}/progress` | Get a progress summary visible to the caller |
| `DELETE` | `/tasks/{task_id}/media/{media_id}` | Request deletion of a media item and its derivatives |

Only expose routes that are actually implemented. Consider pagination for list endpoints and idempotency for uploads or expensive generation requests.

## Suggested status enums

### Task status

`draft`, `processing`, `needs_review`, `approved`, `archived`, `failed`

### Evaluation status

`pass`, `retry`, `unable_to_verify`, `pending_review`

Do not use `pass` as a general claim that the complete physical task is safe. It means only that a specific approved checkpoint met its defined observable criteria.

## Example: create a task

Request:

```http
POST /tasks
Content-Type: application/json
```

```json
{
  "title": "Assemble a simple model",
  "description": "Practice the approved assembly sequence",
  "risk_category": "low"
}
```

Possible response:

```json
{
  "id": "task_example_id",
  "title": "Assemble a simple model",
  "status": "draft"
}
```

Example IDs and payloads are illustrative; adapt them to implemented schemas.

## Example: submit a checkpoint

A multipart request could include `checkpoint_id` and an image file. The API should respond with an evaluation object, for example:

```json
{
  "status": "retry",
  "reason_code": "visible_alignment_mismatch",
  "explanation": "The component appears outside the approved outline.",
  "requires_human_review": false
}
```

The backend must only emit this result when the configured rule/model and evidence support it. If evidence is insufficient, return `unable_to_verify`.

## Error format

Recommended error response:

```json
{
  "error": {
    "code": "unsupported_media_type",
    "message": "Upload a supported video or image format."
  }
}
```

Avoid including filesystem paths, provider responses, prompts, credentials, or private data in error messages.

## API checklist before production

- Authentication and task-level authorization.
- Request schema validation and consistent status codes.
- Upload limits, file-type checks, safe storage, and malware scanning where appropriate.
- Rate limits for uploads and AI calls.
- CORS allowlist and HTTPS.
- Audit trail for instructor approvals and changes to procedures.
- Deletion route that also covers extracted frames and derived files.
- Tests for unauthorized access and insufficient-evidence responses.
