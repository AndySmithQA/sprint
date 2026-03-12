# Research: Kanban Task Flow Board

## Decision 1: UI framework and theme approach
- Decision: Use Bootstrap 5 (with React-Bootstrap components where useful) and enforce a light-theme color system for board surfaces, cards, and states.
- Rationale: Bootstrap is already present in the project, satisfies responsive layout requirements, and avoids additional UI dependencies.
- Alternatives considered:
  - Custom CSS-only component system: rejected because it duplicates solved layout/component concerns and slows delivery.
  - New UI library (e.g., MUI/Chakra): rejected due to constitution requirement for minimal dependencies and existing Bootstrap baseline.

## Decision 2: Date utilities
- Decision: Use date-fns for all date formatting and due-date comparisons.
- Rationale: date-fns provides reliable immutable date helpers and clear APIs for day-level comparisons required by overdue rules.
- Alternatives considered:
  - Native Date only: rejected due to repetitive logic and higher risk of subtle date handling errors.
  - dayjs/luxon: rejected to avoid additional dependency churn when a focused utility library is sufficient.

## Decision 3: Persistence model
- Decision: Persist board state to browser localStorage as a single-user data store.
- Rationale: Matches clarified requirement, avoids backend complexity, and supports reload continuity.
- Alternatives considered:
  - Session-only state: rejected because data loss on refresh reduces usability.
  - Remote API/database: rejected as out-of-scope and adds unnecessary architecture/dependencies.

## Decision 4: Status transition rules
- Decision: Enforce linear transitions Todo -> In Progress -> Done via explicit card actions only.
- Rationale: Aligns with requirements and keeps behavior predictable.
- Alternatives considered:
  - Free drag/drop between any columns: rejected because it allows skipping required workflow steps.
  - Editable task details in all states: rejected due to clarified immutability requirement.

## Decision 5: Overdue and project-goal behavior
- Decision: Mark tasks overdue when current local calendar date is after due date and task is not Done; allow tasks past project end-goal with non-blocking warning.
- Rationale: Day-level local-date logic is simple and predictable; warning behavior preserves workflow continuity.
- Alternatives considered:
  - Time-of-day overdue checks: rejected due to added complexity and timezone confusion.
  - Blocking creation when beyond project goal date: rejected due to clarified requirement for warning-only guidance.

## Best Practices Applied
- Keep derived data (due date, schedule state) computed from canonical fields rather than duplicated mutable state.
- Centralize storage reads/writes in a small utility layer.
- Keep UI state transitions explicit and validated before commit to localStorage.
- Use Bootstrap grid classes for equal-width desktop columns and stacked mobile layout.
