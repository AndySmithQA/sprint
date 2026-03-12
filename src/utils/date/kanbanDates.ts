/**
 * Date utilities for Kanban board using date-fns
 * Immutable date operations and schedule calculations
 */

import {
  addDays,
  format,
  parseISO,
  isAfter,
  isSameDay,
  startOfDay,
} from 'date-fns'

/**
 * Calculate due date from start date and days to complete
 */
export function calculateDueDate(startDate: string, daysToComplete: number): string {
  const start = parseISO(startDate)
  const due = addDays(start, daysToComplete)
  return due.toISOString().split('T')[0] // ISO date only
}

/**
 * Format ISO date string for display
 */
export function formatDate(isoDateString: string): string {
  try {
    const date = parseISO(isoDateString)
    return format(date, 'MMM dd, yyyy')
  } catch {
    return 'Invalid Date'
  }
}

/**
 * Check if a task is overdue today
 * Day-level comparison: task is overdue if today > dueDate and task is not Done
 */
export function isTaskOverdue(dueDate: string, today: Date = new Date()): boolean {
  try {
    const due = startOfDay(parseISO(dueDate))
    const todayStart = startOfDay(today)
    return isAfter(todayStart, due) // today is after due date
  } catch {
    return false
  }
}

/**
 * Check if task due date exceeds project goal date
 * Used for non-blocking warning
 */
export function exceedsProjectGoal(
  taskDueDate: string,
  projectEndGoalDate: string
): boolean {
  try {
    const taskDue = parseISO(taskDueDate)
    const goalDate = parseISO(projectEndGoalDate)
    return isAfter(taskDue, goalDate)
  } catch {
    return false
  }
}

/**
 * Get start of today as ISO date string
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Check if two dates are the same day
 */
export function isSameDateDay(date1: string, date2: string): boolean {
  try {
    const d1 = parseISO(date1)
    const d2 = parseISO(date2)
    return isSameDay(d1, d2)
  } catch {
    return false
  }
}
