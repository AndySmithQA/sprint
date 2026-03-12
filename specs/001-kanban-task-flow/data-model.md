# Data Model: Kanban Task Flow Board

## Entity: ProjectBoard
- Purpose: Top-level board metadata and container for task workflow.
- Fields:
  - id: string (constant single-board identifier)
  - title: string (required, non-empty)
  - endGoalDate: string (ISO date, required after user selection)
  - createdAt: string (ISO datetime)
  - updatedAt: string (ISO datetime)
- Validation:
  - title must be trimmed and non-empty.
  - endGoalDate should be a valid date string.

## Entity: TaskCard
- Purpose: Represents an immutable task definition with mutable workflow status.
- Fields:
  - id: string (unique)
  - name: string (required)
  - description: string (required)
  - startDate: string (ISO date, required)
  - daysToComplete: number (integer, > 0, required)
  - dueDate: string (ISO date, derived from startDate + daysToComplete)
  - status: WorkflowStatus (Todo | InProgress | Done)
  - createdAt: string (ISO datetime)
  - startedAt: string | null (set when moved to InProgress)
  - completedAt: string | null (set when moved to Done)
- Validation:
  - name and description required.
  - daysToComplete must be a whole number greater than zero.
  - dueDate must be computed, not manually edited.

## Value Object: WorkflowStatus
- Values:
  - Todo
  - InProgress
  - Done
- Allowed transitions:
  - Todo -> InProgress
  - InProgress -> Done
- Disallowed transitions:
  - Todo -> Done
  - Done -> Todo/InProgress

## Value Object: ScheduleState
- Values:
  - InScope
  - Overdue
  - Completed
- Rules:
  - Completed if status is Done.
  - Overdue if status is not Done and local current date > dueDate.
  - InScope otherwise.

## Persistence Model
- localStorage key: kanban-board-v1
- Stored shape:
  - projectBoard metadata
  - taskCards array
- Recovery behavior:
  - On load, parse and validate shape.
  - If invalid, fallback to empty default state.

## Derived Computations
- dueDate = addDays(startDate, daysToComplete)
- scheduleState computed at render time to prevent stale persisted state.
- goalDateWarning = dueDate > projectBoard.endGoalDate (non-blocking).
