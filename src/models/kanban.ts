/**
 * Domain types for Kanban Task Flow Board
 * Immutable task definitions and workflow status management
 */

export type WorkflowStatus = 'Todo' | 'InProgress' | 'Done'

export interface ScheduleState {
  status: 'InScope' | 'Overdue' | 'Completed'
}

export interface TaskCard {
  id: string
  name: string
  description: string
  startDate: string // ISO date
  daysToComplete: number // integer > 0
  dueDate: string // ISO date, derived from startDate + daysToComplete
  status: WorkflowStatus
  createdAt: string // ISO datetime
  startedAt: string | null // set when moved to InProgress
  completedAt: string | null // set when moved to Done
}

export interface ProjectBoard {
  id: string
  title: string
  endGoalDate: string // ISO date
  createdAt: string // ISO datetime
  updatedAt: string // ISO datetime
}

export interface BoardState {
  projectBoard: ProjectBoard
  taskCards: TaskCard[]
}

/**
 * Action types for board state management
 */
export interface CreateTaskAction {
  type: 'CREATE_TASK'
  payload: {
    name: string
    description: string
    startDate: string
    daysToComplete: number
    dueDate: string // For reference, though computed in reducer
  }
}

export interface MoveTaskAction {
  type: 'MOVE_TASK'
  payload: {
    taskId: string
    newStatus: WorkflowStatus
  }
}

export interface UpdateProjectAction {
  type: 'UPDATE_PROJECT'
  payload: Partial<Pick<ProjectBoard, 'title' | 'endGoalDate'>>
}

export interface SetBoardAction {
  type: 'SET_BOARD'
  payload: BoardState
}

export type BoardAction =
  | CreateTaskAction
  | MoveTaskAction
  | UpdateProjectAction
  | SetBoardAction

/**
 * Utility: Derive computed schedule state at render time
 */
export function computeScheduleState(
  taskCard: TaskCard,
  today: Date
): ScheduleState['status'] {
  if (taskCard.status === 'Done') {
    return 'Completed'
  }

  const dueDate = new Date(taskCard.dueDate)
  dueDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  if (today > dueDate) {
    return 'Overdue'
  }

  return 'InScope'
}

/**
 * Default board state for new users
 */
export function createDefaultBoard(): BoardState {
  const now = new Date().toISOString()
  const today = new Date()
  const goalDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  return {
    projectBoard: {
      id: 'board-1',
      title: 'My Kanban Board',
      endGoalDate: goalDate.toISOString().split('T')[0],
      createdAt: now,
      updatedAt: now,
    },
    taskCards: [],
  }
}
