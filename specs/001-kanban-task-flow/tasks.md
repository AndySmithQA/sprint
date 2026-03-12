# Tasks: Kanban Task Flow Board

**Input**: Design documents from `specs/001-kanban-task-flow/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Testing tasks are post-content and OPTIONAL. No test tasks are included because the specification does not explicitly request testing during this phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency setup for the Kanban feature.

- [X] T001 Add date-fns dependency to project in package.json
- [X] T002 Import Bootstrap stylesheet in src/main.tsx
- [X] T003 Create feature folder structure for board UI in src/components/board/.gitkeep
- [X] T004 [P] Create feature folder structure for card UI in src/components/cards/.gitkeep
- [X] T005 [P] Create feature folder structure for forms UI in src/components/forms/.gitkeep
- [X] T006 [P] Create feature folder structure for header UI in src/components/header/.gitkeep
- [X] T007 [P] Create utility folder structure for dates in src/utils/date/.gitkeep
- [X] T008 [P] Create utility folder structure for storage in src/utils/storage/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared models and utilities required before user story implementation.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T009 Define board and task domain types in src/models/kanban.ts
- [X] T010 Implement localStorage repository with validation fallback in src/utils/storage/kanbanStorage.ts
- [X] T011 Implement due-date and schedule-state helpers using date-fns in src/utils/date/kanbanDates.ts
- [X] T012 Create shared light-theme status tokens and layout constants in src/components/board/boardTheme.ts
- [X] T013 Implement shared board state reducer for create/move/project updates in src/models/kanbanReducer.ts
- [X] T014 Wire initial app-level Kanban state bootstrap and persistence effect in src/App.tsx

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Create and View Planned Work (Priority: P1) 🎯 MVP

**Goal**: Users can create Todo tasks and view all three columns in a responsive light-themed board.

**Independent Validation**: Create multiple tasks and confirm they appear in Todo with due-date/schedule color handling and non-blocking goal-date warning.

### Implementation for User Story 1

- [X] T015 [P] [US1] Implement project board layout with evenly distributed Todo/In Progress/Done columns in src/components/board/KanbanBoard.tsx
- [X] T016 [P] [US1] Implement immutable task card presentation component in src/components/cards/TaskCard.tsx
- [X] T017 [US1] Implement task creation form with required fields and validation in src/components/forms/NewTaskForm.tsx
- [X] T018 [US1] Implement task creation action and Todo insertion flow in src/models/kanbanReducer.ts
- [X] T019 [US1] Implement due-date display and in-scope/overdue visual state mapping in src/components/cards/TaskCard.tsx
- [X] T020 [US1] Implement non-blocking warning when due date exceeds project goal date in src/components/forms/NewTaskForm.tsx
- [X] T021 [US1] Compose board and creation form into app shell in src/App.tsx
- [X] T022 [US1] Add responsive board and light-theme styling rules in src/App.css

**Checkpoint**: User Story 1 is fully functional and independently valuable (MVP).

---

## Phase 4: User Story 2 - Progress Work Across Stages (Priority: P2)

**Goal**: Users can move tasks from Todo to In Progress to Done via explicit card actions.

**Independent Validation**: Move one task through Started then Completed actions; verify transitions and action visibility are correct in each column.

### Implementation for User Story 2

- [X] T023 [US2] Implement Started transition handler (Todo -> In Progress) in src/models/kanbanReducer.ts
- [X] T024 [US2] Implement Completed transition handler (In Progress -> Done) in src/models/kanbanReducer.ts
- [X] T025 [US2] Enforce invalid transition guards and task immutability rules in src/models/kanbanReducer.ts
- [X] T026 [US2] Add status-aware action controls per column in src/components/cards/TaskCard.tsx
- [X] T027 [US2] Render cards by workflow column and hide invalid actions in src/components/board/KanbanBoard.tsx
- [X] T028 [US2] Persist and restore transition timestamps (startedAt/completedAt) in src/utils/storage/kanbanStorage.ts

**Checkpoint**: User Story 2 works independently with strict workflow transitions.

---

## Phase 5: User Story 3 - Manage Project Context and Deadlines (Priority: P3)

**Goal**: Users can edit project title and end goal date, and changes persist across reloads.

**Independent Validation**: Update title and goal date, refresh browser, and confirm persisted values are restored and used by warnings.

### Implementation for User Story 3

- [X] T029 [US3] Implement editable project title control in src/components/header/ProjectHeader.tsx
- [X] T030 [US3] Implement project end goal date selector in src/components/header/ProjectHeader.tsx
- [X] T031 [US3] Implement project metadata update actions in src/models/kanbanReducer.ts
- [X] T032 [US3] Integrate project header into app layout and connect state in src/App.tsx
- [X] T033 [US3] Reuse project goal date in task warning flow in src/components/forms/NewTaskForm.tsx

**Checkpoint**: User Story 3 is independently functional and persists metadata.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality and consistency improvements across stories.

- [X] T034 [P] Refine responsive spacing and light contrast consistency in src/App.css
- [X] T035 [P] Improve empty-state guidance text for each column in src/components/board/KanbanBoard.tsx
- [X] T036 Improve form and warning copy clarity for task planning constraints in src/components/forms/NewTaskForm.tsx
- [X] T037 Validate quickstart flow against current implementation notes in specs/001-kanban-task-flow/quickstart.md
- [X] T038 Document feature usage and local persistence behavior in README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Phase 6)**: Depends on completion of selected user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational phase and provides MVP value.
- **User Story 2 (P2)**: Starts after Foundational; depends on US1 card/board structure.
- **User Story 3 (P3)**: Starts after Foundational; can run in parallel with US2 if US1 shell is merged.

### Within Each User Story

- Shared/state model updates before final UI wiring.
- Component rendering before integration in `src/App.tsx`.
- Optional validation tasks are post-content and not required in this file.

---

## Parallel Opportunities

- **Phase 1**: T004-T008 can run in parallel after T003.
- **US1**: T015 and T016 can run in parallel before integration tasks.
- **US3**: T031 can run in parallel with US2 reducer work because it touches a shared reducer concern after US1 baseline merge.
- **Polish**: T034 and T035 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Parallel UI foundation tasks:
Task: "Implement project board layout in src/components/board/KanbanBoard.tsx"
Task: "Implement immutable task card presentation component in src/components/cards/TaskCard.tsx"

# Then continue with integration tasks:
Task: "Implement task creation form in src/components/forms/NewTaskForm.tsx"
Task: "Compose board and form in src/App.tsx"
```

---

## Parallel Example: User Story 3

```bash
# Parallel after US1 baseline merge:
Task: "Implement project metadata update actions in src/models/kanbanReducer.ts"
Task: "Reuse project goal date in task warning flow in src/components/forms/NewTaskForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validate MVP behavior using quickstart flow.

### Incremental Delivery

1. Deliver MVP with US1.
2. Add workflow transitions with US2.
3. Add project metadata controls with US3.
4. Finish with Phase 6 polish tasks.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. Developer A: US1 integration.
3. Developer B: US2 reducer/actions.
4. Developer C: US3 project metadata header.
