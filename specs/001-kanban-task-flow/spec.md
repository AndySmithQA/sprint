# Feature Specification: Kanban Task Flow Board

**Feature Branch**: `001-kanban-task-flow`  
**Created**: 2026-03-12  
**Status**: Draft  
**Input**: User description: "This application should be a kanban board setup with todo / in progress / done sections. These should be spread evenly throughout the page. Users should be able to change the title of the project at the top and select an end goal date. Users should be able to create a new item to go into the todo section which includes a name, description, start date, number of days to complete. There should be a button on each card which lets the user indicate they have started the task. This will then move it into the in progress section. Equally, once in the in progress section, a button for completed should be available which then moves the task to the done section. Colours should reflect if the task is overdue or still within scope."

## Clarifications

### Session 2026-03-12

- Q: What data persistence model should be used for board and task data? -> A: Single-user local persistence using browser local storage.
- Q: Should tasks be editable after creation? -> A: Tasks are not editable after creation; only status movement is allowed.
- Q: How is overdue status determined? -> A: Overdue when the current local calendar date is after the due date (day-level comparison).
- Q: How should the system handle a task due date later than the project end goal date? -> A: Allow creation and show a warning.

## User Scenarios *(mandatory)*

### User Story 1 - Create and View Planned Work (Priority: P1)

As a user, I can create tasks in the Todo column with the required details so I can plan work and immediately see it in a clear board layout.

**Why this priority**: Without task creation and visibility, the board cannot provide core planning value.

**Independent Validation**: Can be validated by creating multiple Todo tasks and confirming each card appears with name, description, start date, duration, and status color.

**Acceptance Scenarios**:

1. **Given** an empty board, **When** the user submits a valid new task form, **Then** a new card appears in Todo with all entered values.
2. **Given** the board is loaded, **When** the user views the columns, **Then** Todo, In Progress, and Done are displayed evenly across the page.
3. **Given** a task with a defined schedule, **When** the current date is on or before its due date, **Then** the card shows an in-scope color state.

---

### User Story 2 - Progress Work Across Stages (Priority: P2)

As a user, I can move tasks from Todo to In Progress and then to Done using explicit buttons so progress is clear and controlled.

**Why this priority**: Workflow movement is the core value of a Kanban board after initial planning.

**Independent Validation**: Can be validated by moving a task from Todo to In Progress with a Started action, then to Done with a Completed action.

**Acceptance Scenarios**:

1. **Given** a task in Todo, **When** the user selects Started, **Then** the task is removed from Todo and appears in In Progress.
2. **Given** a task in In Progress, **When** the user selects Completed, **Then** the task is removed from In Progress and appears in Done.
3. **Given** a task in Done, **When** the board refreshes, **Then** the task remains in Done and no Started or Completed action is shown.

---

### User Story 3 - Manage Project Context and Deadlines (Priority: P3)

As a user, I can rename the project and set an end goal date so the board reflects my current objective and delivery target.

**Why this priority**: Project metadata improves context and accountability but is secondary to task flow.

**Independent Validation**: Can be validated by editing the project title and goal date, then confirming both values are shown at the top of the board.

**Acceptance Scenarios**:

1. **Given** a default project title, **When** the user updates the title and saves, **Then** the new title is shown at the top of the board.
2. **Given** no goal date selected, **When** the user chooses a valid end goal date, **Then** the selected date is shown with the project header.

### Edge Cases

- What happens when a user attempts to create a task without required fields (name, start date, or days to complete)?
- How does the system handle a task whose due date has passed while it is still in Todo or In Progress?
- What happens when days to complete is zero, negative, or not a whole number?
- How does the board behave when all columns are empty?
- What happens to status colors for tasks in Done that were completed after their due date?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display exactly three task columns labeled Todo, In Progress, and Done.
- **FR-002**: System MUST present the three columns in an even horizontal layout on desktop and a responsive stacked layout on narrow screens.
- **FR-003**: System MUST allow users to create a new task with name, description, start date, and number of days to complete.
- **FR-004**: System MUST place newly created tasks into the Todo column.
- **FR-005**: System MUST calculate each task due date from start date plus number of days to complete.
- **FR-006**: System MUST provide a Started action on Todo cards that moves the selected task to In Progress.
- **FR-007**: System MUST provide a Completed action on In Progress cards that moves the selected task to Done.
- **FR-008**: System MUST prevent direct movement from Todo to Done in a single action.
- **FR-009**: System MUST allow users to edit the project title shown at the top of the board.
- **FR-010**: System MUST allow users to select and display a project end goal date at the top of the board.
- **FR-011**: System MUST visually indicate task schedule state using color cues for in-scope versus overdue tasks.
- **FR-012**: System MUST apply overdue indication when the current local calendar date is later than a task due date and the task is not in Done.
- **FR-013**: System MUST keep completed tasks in Done with a distinct completed visual state.
- **FR-014**: System MUST show clear validation feedback when required task inputs are missing or invalid.
- **FR-015**: System MUST persist project title, end goal date, and tasks in browser local storage for a single user.
- **FR-016**: System MUST restore persisted board data from browser local storage when the application reloads.
- **FR-017**: System MUST NOT allow editing of task details after creation.
- **FR-018**: System MUST allow only workflow status transitions (Started, Completed) after task creation.
- **FR-019**: System MUST allow task creation when task due date exceeds project end goal date and MUST display a non-blocking warning.

### Experience and Design Constraints

- **UX-001**: User experience MUST remain simple and clear for the primary journey.
- **UX-002**: UI MUST be responsive across mobile and desktop breakpoints used by the feature.
- **UX-003**: UI styling MUST follow a light theme unless explicitly overridden in the feature request.

### Delivery and Validation Constraints

- **DV-001**: During specification and design, testing tasks MUST NOT be required as blocking gates.
- **DV-002**: Testing MAY be defined as post-content work after core content and design are complete.

### Key Entities *(include if feature involves data)*

- **ProjectBoard**: Represents the board context with project title, end goal date, and the three workflow columns.
- **TaskCard**: Represents an individual task with name, description, start date, planned duration in days, derived due date, and workflow status.
- **WorkflowStatus**: Represents the allowed stage values (Todo, In Progress, Done) and valid transitions between them.
- **ScheduleState**: Represents time-state labeling for a task (In Scope, Overdue, Completed) used for color indication.

### Assumptions

- Overdue state applies only to tasks not yet completed.
- Card color rules are based on whole-day calendar comparison using the user-local date.
- Completed tasks keep a completed style and are not recolored as overdue.
- Project title and end goal date are single-board values managed at the top header area.
- Board data is stored per browser profile and is not shared across users or devices.
- Task details remain immutable after creation to keep workflow behavior simple.
- Due-date checks use local date-only comparison, not time-of-day timestamps.
- Project end goal date acts as planning guidance and warning criteria, not a hard block for task creation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of users can create a new Todo task with all required fields in under 60 seconds.
- **SC-002**: 95% of users can move a task from Todo to Done through the required two-step flow without guidance.
- **SC-003**: 100% of tasks with due dates before today and not completed are shown with overdue color indication.
- **SC-004**: At least 90% of users report that board status is clear at a glance in usability feedback.
- **SC-005**: On common mobile and desktop viewport sizes, all three sections remain readable without horizontal scrolling.
