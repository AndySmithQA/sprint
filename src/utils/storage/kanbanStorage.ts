/**
 * Storage layer for Kanban board persistence
 * Single-user browser localStorage with validation fallback
 */

import type { BoardState } from '../../models/kanban'
import { createDefaultBoard } from '../../models/kanban'

const STORAGE_KEY = 'kanban-board-v1'

/**
 * Validate board state shape and structure
 */
function validateBoardState(data: unknown): data is BoardState {
  if (!data || typeof data !== 'object') {
    return false
  }

  const board = data as any

  // Check projectBoard structure
  if (!board.projectBoard || typeof board.projectBoard !== 'object') {
    return false
  }

  const pb = board.projectBoard
  if (
    typeof pb.id !== 'string' ||
    typeof pb.title !== 'string' ||
    typeof pb.endGoalDate !== 'string' ||
    typeof pb.createdAt !== 'string' ||
    typeof pb.updatedAt !== 'string'
  ) {
    return false
  }

  // Check taskCards array
  if (!Array.isArray(board.taskCards)) {
    return false
  }

  // Validate each task card
  for (const card of board.taskCards) {
    if (
      typeof card.id !== 'string' ||
      typeof card.name !== 'string' ||
      typeof card.description !== 'string' ||
      typeof card.startDate !== 'string' ||
      typeof card.daysToComplete !== 'number' ||
      typeof card.dueDate !== 'string' ||
      !['Todo', 'InProgress', 'Done'].includes(card.status) ||
      typeof card.createdAt !== 'string' ||
      (card.startedAt !== null && typeof card.startedAt !== 'string') ||
      (card.completedAt !== null && typeof card.completedAt !== 'string')
    ) {
      return false
    }
  }

  return true
}

/**
 * Save board state to localStorage
 * Silently fails if localStorage is unavailable
 */
export function saveBoardState(state: BoardState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save board state:', error)
  }
}

/**
 * Load board state from localStorage
 * Returns default state if localStorage is empty or invalid
 */
export function loadBoardState(): BoardState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return createDefaultBoard()
    }

    const parsed = JSON.parse(stored)

    if (validateBoardState(parsed)) {
      return parsed
    }

    console.warn('Invalid stored board state, falling back to default')
    return createDefaultBoard()
  } catch (error) {
    console.error('Failed to load board state:', error)
    return createDefaultBoard()
  }
}

/**
 * Clear all stored board state
 */
export function clearBoardState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear board state:', error)
  }
}
