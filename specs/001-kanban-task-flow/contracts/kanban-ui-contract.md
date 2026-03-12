# UI Contract: Kanban Task Flow Board

## Scope
This contract defines user-visible interactions and state transitions for the single-page Kanban UI.

## Board Layout Contract
- The page MUST present three sections labeled Todo, In Progress, and Done.
- On desktop widths, sections MUST render evenly across the row.
- On narrow/mobile widths, sections MUST stack vertically while preserving order.
- Visual theme MUST remain light.

## Header Contract
- Project title MUST be visible and editable.
- End goal date MUST be selectable and visible.
- Header changes MUST persist to localStorage.

## Task Creation Contract
- Required fields:
  - name
  - description
  - start date
  - number of days to complete (positive integer)
- On submit:
  - create a new task in Todo
  - compute due date
  - if due date exceeds project end goal date, show non-blocking warning
  - persist updated board state
- Validation failures MUST be shown inline and block creation.

## Task Status Action Contract
- In Todo, each card MUST expose Started action.
- Selecting Started MUST move task to In Progress and persist state.
- In In Progress, each card MUST expose Completed action.
- Selecting Completed MUST move task to Done and persist state.
- Cards in Done MUST not expose Started or Completed actions.

## Task Immutability Contract
- After creation, task fields (name, description, start date, days to complete) MUST NOT be editable.
- Only status transition actions are permitted.

## Color State Contract
- InScope: visible light-theme in-scope color treatment.
- Overdue: visible light-theme overdue color treatment when local date is after due date and status != Done.
- Completed: visible light-theme completed treatment for Done cards.

## Persistence Contract
- Application MUST restore project metadata and tasks from localStorage on page load.
- Corrupt or missing localStorage data MUST fail safely to default empty board state.
