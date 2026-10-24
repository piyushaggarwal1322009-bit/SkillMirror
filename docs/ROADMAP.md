# Roadmap

This roadmap is a proposal, not a claim that listed features are already implemented. Prioritize a reliable end-to-end workflow over a large number of partially working AI features.

## Phase 0 — Scope and fixtures

- [ ] Select one non-hazardous task with visible, testable steps.
- [ ] Interview at least one instructor and several learners.
- [ ] Define expected outcomes and evaluation limits.
- [ ] Prepare consented or synthetic demonstration media.

**Exit criteria:** The task can be assessed using clear observable criteria and a small labeled example set.

## Phase 1 — Functional MVP

- [ ] Task library and task creation.
- [ ] Demonstration upload with progress/error states.
- [ ] Instructor-editable procedure drafts.
- [ ] Procedure versioning and approval.
- [ ] Learner guided-practice view.
- [ ] One checkpoint evaluator for the selected task.
- [ ] `pass`, `retry`, and `unable_to_verify` outcomes.
- [ ] Progress summary and basic tests.

**Exit criteria:** A single task can be completed end to end without pretending simulated output is real inference.

## Phase 2 — Reliable feedback

- [ ] Build a broader evaluation dataset for the chosen checkpoint.
- [ ] Measure false passes and false failures.
- [ ] Link feedback to the evidence and approved rule.
- [ ] Add retry guidance for poor camera angles or occlusion.
- [ ] Add robust upload processing and retry behavior.
- [ ] Add access controls, retention, and deletion flows.

**Exit criteria:** Known failure modes are documented and unclear evidence fails safely.

## Phase 3 — Multiple task templates

- [ ] Support more than one low-risk task type.
- [ ] Add instructor dashboard and learner progress comparison.
- [ ] Add exportable training guide and assessment summary.
- [ ] Improve mobile capture guidance and accessibility.

**Exit criteria:** The same workflow can be configured for distinct tasks without rewriting core logic.

## Phase 4 — Research and expansion

- [ ] Evaluate adaptive practice based on repeated errors.
- [ ] Test multilingual instructions with human review.
- [ ] Explore multi-view evidence and object/hand tracking.
- [ ] Run a supervised pilot with a training partner.
- [ ] Assess performance and privacy before any higher-risk domain expansion.

## Non-goals for the early prototype

- Certifying competence for hazardous work.
- Replacing qualified instructors or safety procedures.
- Claiming reliable understanding of every physical task from a single video.
- Automatically publishing AI-generated procedures without review.
- Using learner recordings for model training without informed consent.
