# Testing Strategy

## Objectives

Testing should demonstrate that SkillMirror guides a learner accurately within the scope of a known task, preserves instructor review, protects private media, and declines to make unsupported visual claims.

## Test layers

### 1. Unit tests

Cover:

- Task/procedure/checkpoint schema validation.
- Procedure step ordering and version changes.
- Status transitions, including processing failures.
- Checkpoint threshold/rule logic.
- Mapping of low-quality or missing evidence to `unable_to_verify`.
- Redaction and safe error formatting.

### 2. API tests

Cover:

- Valid and invalid task creation.
- Supported and unsupported file types.
- Oversized video/image rejection.
- Unauthorized requests to read, change, or delete another user's task/media.
- Instructor approval required before a procedure becomes usable.
- Submission behavior for each evaluation status.
- Deletion of originals and derived files.

### 3. Computer-vision evaluation

Create a small, consented test set with documented expected outcomes. Include:

- Correct examples under different lighting and backgrounds.
- Incorrect examples showing the target mismatch.
- Blurry, occluded, cropped, and out-of-angle examples.
- Objects that resemble the target but should not pass.
- Empty or malformed inputs.

Report per-class metrics where relevant, false-pass and false-fail counts, and known limitations. Do not tune and evaluate only on the exact same images.

### 4. End-to-end tests

At minimum, verify this workflow:

1. Create task.
2. Upload a demonstration.
3. Generate a draft procedure.
4. Edit and approve a version.
5. Open guided practice.
6. Submit evidence.
7. Display result and progress.

Also verify a failed upload, a model/API outage, and an unclear checkpoint image.

### 5. Accessibility and responsive tests

- Keyboard-only navigation of instructor and learner flows.
- Visible focus indicators and accessible labels.
- Meaningful status announcements for screen readers.
- Usable layout on small mobile screens.
- Do not convey evaluation status through color alone.

## Demo fixture policy

Use synthetic or staged media with permission. Keep fixture metadata explicit about whether expected outcomes are actual, manually labeled, or simulated. Never use private workplace recordings without authorization.

## Recommended release gate

Do not present an evaluation feature as implemented until tests cover passing, failing, and insufficient-evidence cases. For the initial MVP, use low-risk tasks and require instructor approval of task criteria. A successful test suite does not certify that the product is suitable for safety-critical work.
