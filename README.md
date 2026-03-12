# Kanban Task Flow Board

A light-themed, responsive Kanban board application for personal task management. Create, organize, and track tasks across three workflow stages: Todo, In Progress, and Done.

## Features

### Core Functionality

✅ **Three-Column Board Layout**
- Visually distinct Todo, In Progress, and Done columns
- Evenly distributed responsive design that adapts to all screen sizes
- Column counts display current task distribution
- Empty state guidance for each column

✅ **Task Management**
- Create tasks with title, description, start date, and duration estimates
- Immutable task details after creation (status-only transitions allowed)
- Visual schedule state indicators: In Scope (green), Overdue (red), Completed (gray)
- Task due dates calculated automatically from start date + days to complete

✅ **Workflow Transitions**
- Linear workflow: Todo → In Progress → Completed
- Explicit action buttons on task cards (Started/Completed)
- Automatic timestamp tracking (startedAt, completedAt)
- Invalid transitions prevented with visual state

✅ **Project Management**
- Editable project title
- Project end goal date configuration
- Non-blocking warning when task due dates exceed project deadlines
- All project metadata persists across browser reloads

✅ **Data Persistence**
- Single-user browser localStorage persistence
- Automatic save on every state change
- Graceful recovery with validation fallback
- No backend or network dependencies

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Bootstrap 5.3 with custom CSS
- **Date Utilities**: date-fns for immutable date calculations
- **Build Tool**: Vite
- **Storage**: Browser localStorage API

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Usage

### Creating a Board

1. Enter your project title in the header (default: "My Kanban Board")
2. Set your project end goal date (deadline for all tasks)
3. Start creating tasks!

### Creating Tasks

1. Fill in the task form on the right sidebar:
   - **Task Name**: Brief title of the task
   - **Description**: Detailed explanation of what needs to be done
   - **Start Date**: When you plan to begin this task
   - **Days to Complete**: How many days you estimate the task will take
   
2. The system calculates the due date automatically (start date + days)

3. If the due date exceeds your project goal date, you'll see a warning (but can still create the task)

4. Click **Create Task** to add the task

### Managing Tasks

1. **Move Tasks**: Use the **Started** button to move from Todo → In Progress. Use **Completed** to move to Done.

2. **View Status**: Each task shows:
   - Schedule state badge (In Scope / Overdue / Completed)
   - Start and due dates
   - Days to complete estimate

3. **Overdue Tracking**: Tasks are marked overdue (red) if today's date is past the due date and the task is not completed.

### Data Persistence

Your board state is automatically saved to your browser's localStorage whenever you:
- Create a new task
- Move a task between columns
- Update the project title or goal date

If you clear your browser's cache, the data will be reset to the default state.

## Color Semantics

- **Green (#28a745)**: Task is on schedule (In Scope)
- **Red (#dc3545)**: Task is overdue and not completed
- **Gray (#6c757d)**: Task is completed
- **Blue (#0c63e4)**: Interactive elements and primary actions

## Responsive Design

The board automatically adapts to different screen sizes:

- **Desktop (≥992px)**: Three columns displayed side-by-side with task form in right sidebar
- **Tablet (768px - 991px)**: Flexible stacked layout
- **Mobile (<768px)**: Full-width columns, form positioned below board

## Keyboard Shortcuts (In Forms)

- **Enter**: Save changes (Edit fields, Task creation)
- **Escape**: Cancel editing

## Known Limitations

- Single-user, browser-local persistence (not synced across browsers or devices)
- No task editing after creation (immutability by design)
- No task deletion (tasks remain in Done for historical tracking)
- No backend integration (standalone frontend application)

## Architecture

### File Structure

```
src/
├── components/
│   ├── board/
│   │   ├── KanbanBoard.tsx      # Main board layout component
│   │   ├── KanbanBoard.css
│   │   └── boardTheme.ts        # Design tokens and theme constants
│   ├── cards/
│   │   ├── TaskCard.tsx         # Individual task card presentation
│   │   └── TaskCard.css
│   ├── forms/
│   │   ├── NewTaskForm.tsx      # Task creation form with validation
│   │   └── NewTaskForm.css
│   └── header/
│       ├── ProjectHeader.tsx    # Project metadata editor
│       └── ProjectHeader.css
├── models/
│   ├── kanban.ts                # Domain types and interfaces
│   └── kanbanReducer.ts         # State management reducer
├── utils/
│   ├── date/
│   │   └── kanbanDates.ts       # Date utilities using date-fns
│   └── storage/
│       └── kanbanStorage.ts     # localStorage persistence layer
├── App.tsx                       # Main application component
├── App.css                       # Global styling
└── main.tsx                      # Application entry point
```

### State Management

State is managed through React's `useReducer` hook with the following action types:

- **CREATE_TASK**: Add a new task to the Todo column
- **MOVE_TASK**: Transition a task between columns (with validation)
- **UPDATE_PROJECT**: Update project title or end goal date
- **SET_BOARD**: Replace entire board state (used for localStorage recovery)

### Validation & Guards

- Task creation requires all fields
- Days to complete must be greater than 0
- Transitions only allowed in linear order (Todo → InProgress → Done)
- No transitions allowed from Done state
- Goal date warnings are non-blocking but informative

## Development

### Development Server

```bash
npm run dev
```

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Code Quality

- Full TypeScript type safety with `verbatimModuleSyntax`
- ESLint configuration enforces code quality
- Bootstrap and custom CSS for consistent styling
- Responsive design tested on mobile, tablet, and desktop viewports

## Performance

- Lightweight bundle: ~230KB (production build, gzipped ~72KB)
- No complex dependencies beyond date-fns
- Efficient React re-renders with proper memoization
- Sticky task form in sidebar for easy access

## Browser Support

- Modern browsers with ES2020+ support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future versions:

- Task editing (description/dates only)
- Task deletion
- Task filtering and search
- Multiple boards/projects
- Drag-and-drop reordering
- Custom status columns
- Dark mode theme
- Export/import functionality

## License

This project is part of the sprint application - see repository for license details.

## Support

For issues or questions, refer to the specification documents in `specs/001-kanban-task-flow/` for detailed requirements and design decisions.

