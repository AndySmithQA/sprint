/**
 * State reducer for Kanban board
 * Handles all state mutations for create, move, and project updates
 */

import type {
  BoardState,
  BoardAction,
  TaskCard,
} from './kanban'
import { createDefaultBoard } from './kanban'
import { calculateDueDate } from '../utils/date/kanbanDates'

/**
 * Validate allowed transitions
 */
function isValidTransition(
  currentStatus: string,
  newStatus: string
): boolean {
  const transitions: Record<string, string[]> = {
    Todo: ['InProgress'],
    InProgress: ['Done'],
    Done: [],
  }

  return transitions[currentStatus]?.includes(newStatus) ?? false
}

/**
 * Create a new task with auto-generated ID
 */
function createTask(
  payload: {
    name: string
    description: string
    startDate: string
    daysToComplete: number
    dueDate?: string // ignored, computed below
  }
): TaskCard {
  const now = new Date().toISOString()
  const id = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  return {
    id,
    name: payload.name,
    description: payload.description,
    startDate: payload.startDate,
    daysToComplete: payload.daysToComplete,
    dueDate: calculateDueDate(payload.startDate, payload.daysToComplete),
    status: 'Todo',
    createdAt: now,
    startedAt: null,
    completedAt: null,
  }
}

/**
 * Move task to new status with transition validation
 */
function moveTask(
  taskCards: TaskCard[],
  taskId: string,
  newStatus: string
): TaskCard[] {
  return taskCards.map((card) => {
    if (card.id !== taskId) {
      return card
    }

    // Validate transition
    if (!isValidTransition(card.status, newStatus)) {
      console.warn(
        `Invalid transition: ${card.status} -> ${newStatus}`
      )
      return card
    }

    const now = new Date().toISOString()
    const updated: TaskCard = {
      ...card,
      status: newStatus as any,
    }

    // Set transition timestamps
    if (newStatus === 'InProgress' && !card.startedAt) {
      updated.startedAt = now
    }

    if (newStatus === 'Done' && !card.completedAt) {
      updated.completedAt = now
    }

    return updated
  })
}

/**
 * Main reducer function
 */
export function boardReducer(
  state: BoardState = createDefaultBoard(),
  action: BoardAction
): BoardState {
  switch (action.type) {
    case 'CREATE_TASK': {
      const newTask = createTask(action.payload)
      return {
        ...state,
        taskCards: [...state.taskCards, newTask],
      }
    }

    case 'MOVE_TASK': {
      const updatedCards = moveTask(
        state.taskCards,
        action.payload.taskId,
        action.payload.newStatus
      )
      return {
        ...state,
        taskCards: updatedCards,
      }
    }

    case 'UPDATE_PROJECT': {
      const now = new Date().toISOString()
      return {
        ...state,
        projectBoard: {
          ...state.projectBoard,
          ...action.payload,
          updatedAt: now,
        },
      }
    }

    case 'SET_BOARD': {
      return action.payload
    }

    default:
      return state
  }
}
