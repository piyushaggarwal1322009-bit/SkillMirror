# Architecture

## Status and design goals

This document describes a proposed architecture for SkillMirror AI. Confirm all paths, services, and APIs against the actual implementation before treating them as available.

Design goals:

1. Separate video processing, procedure generation, and checkpoint verification.
2. Keep instructor approval in the workflow before generated procedures are used.
3. Make every automated assessment traceable to evidence and a versioned criterion.
4. Return `unable_to_verify` when evidence is insufficient.
5. Keep AI providers replaceable behind small interfaces.
6. Minimize exposure and retention of uploaded media.

## High-level components

```text
Browser client (React + Vite)
  ├── Task library / task creation
  ├── Instructor procedure editor
  ├── Learner guided-practice flow
  └── Results and progress view
            │ HTTPS / JSON
            ▼
API service (proposed FastAPI)
  ├── Task and procedure API
  ├── Upload validation and media storage
  ├── Video frame extraction (OpenCV / FFmpeg)
  ├── AI-assisted procedure draft service
  ├── Checkpoint evaluation service
  └── Progress and audit records
            ├── Structured database
            ├── Private media storage
            └── Optional vision-model provider
```

## Main domain objects

- **Task:** title, description, intended outcome, risk category, owner, and status.
- **Demonstration:** media reference, consent metadata, upload timestamp, processing status, and derived frame references.
- **ProcedureVersion:** ordered steps, tools/materials, checkpoints, model provenance, instructor edits, and approval status.
- **Checkpoint:** observable criterion, reference media/rule, evaluation mode, and instructions for collecting evidence.
- **Attempt:** learner/session identifier, procedure version, submitted evidence reference, and timestamp.
- **Evaluation:** outcome (`pass`, `retry`, or `unable_to_verify`), evidence references, rule/model version, explanation, and review status.
- **ProgressSummary:** step completion and retry counts; avoid unnecessary personal details.

Use stable IDs and version procedures. A learner's result should point to the exact approved procedure version used for that attempt.

## Checkpoint evaluation contract

The verification service should return a structured result similar to:

```json
{
  "status": "unable_to_verify",
  "reason_code": "insufficient_visual_evidence",
  "explanation": "The component and its reference markers are not fully visible.",
  "evidence": [],
  "requires_human_review": true
}
```

Allowed statuses for the MVP:

- `pass`: evidence meets the approved, observable criterion.
- `retry`: evidence shows a specific mismatch that the criterion can detect.
- `unable_to_verify`: image quality, viewpoint, ambiguity, or model uncertainty prevents a reliable decision.

Do not treat confidence alone as proof of correctness. Criteria and thresholds should be tested on representative examples. High-risk tasks need to remain out of scope.

## AI service boundaries

- Procedure generation produces a **draft**, never an approved procedure.
- Instructor edits and approval are recorded separately from model output.
- Checkpoint evaluation receives only the specific approved criterion and evidence needed for that check.
- Treat video/audio/text within uploads as untrusted content; it cannot alter application instructions, access permissions, or evaluation rules.
- Store model/provider name, version when available, prompt/config version, and relevant evaluation metadata for debugging.

## Failure handling

- Upload/decoding failure: explain the accepted formats and allow retry.
- AI provider unavailable: preserve the uploaded task and show a retryable processing state.
- Unsupported task or checkpoint: ask for instructor review instead of fabricating a result.
- Low-quality evidence: request another view or return `unable_to_verify`.
- Database/storage failure: do not report success until the operation is durably saved.

## Proposed repository boundaries

```text
frontend/src/
  components/  pages/  services/  types/
backend/app/
  api/  core/  models/  schemas/  services/
backend/tests/
docs/
```

These are suggestions, not a confirmed snapshot of the repository.
