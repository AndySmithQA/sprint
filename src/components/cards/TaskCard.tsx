/**
 * Immutable task card presentation component
 * Displays task details and provides status-aware action buttons
 */

import React from 'react'
import type { TaskCard, WorkflowStatus } from '../../models/kanban'
import { computeScheduleState } from '../../models/kanban'
import { formatDate } from '../../utils/date/kanbanDates'
import { classNames, colors } from '../board/boardTheme'
import './TaskCard.css'

interface TaskCardComponentProps {
  task: TaskCard
  columnStatus: WorkflowStatus
  onMoveTask: (taskId: string, newStatus: WorkflowStatus) => void
}

const TaskCardComponent: React.FC<TaskCardComponentProps> = ({
  task,
  columnStatus,
  onMoveTask,
}) => {
  const today = new Date()
  const scheduleState = computeScheduleState(task, today)

  // Determine card styling based on schedule state
  let cardClassName = classNames.card
  let scheduleStateClass = ''
  let scheduleStateLabel = 'In Scope'
  let scheduleStateColor: string = colors.inScope

  if (scheduleState === 'Overdue') {
    scheduleStateClass = classNames.cardOverdue
    scheduleStateColor = colors.overdue as string
    scheduleStateLabel = 'Overdue'
  } else if (scheduleState === 'Completed') {
    scheduleStateClass = classNames.cardCompleted
    scheduleStateColor = colors.completed as string
    scheduleStateLabel = 'Completed'
  } else {
    scheduleStateClass = classNames.cardInScope
  }

  // Determine available actions based on current status
  const canStart = columnStatus === 'Todo'
  const canComplete = columnStatus === 'InProgress'

  const handleStart = () => {
    if (canStart) {
      onMoveTask(task.id, 'InProgress')
    }
  }

  const handleComplete = () => {
    if (canComplete) {
      onMoveTask(task.id, 'Done')
    }
  }

  return (
    <div className={`${cardClassName} ${scheduleStateClass}`}>
      <div className="card-header">
        <h4 className="card-title">{task.name}</h4>
        <span
          className="schedule-state-badge"
          style={{ backgroundColor: scheduleStateColor }}
        >
          {scheduleStateLabel}
        </span>
      </div>

      <div className="card-body">
        <p className="card-description">{task.description}</p>

        <div className="card-dates">
          <div className="date-item">
            <span className="date-label">Start:</span>
            <span className="date-value">{formatDate(task.startDate)}</span>
          </div>
          <div className="date-item">
            <span className="date-label">Due:</span>
            <span className="date-value">{formatDate(task.dueDate)}</span>
          </div>
          <div className="date-item">
            <span className="date-label">Days:</span>
            <span className="date-value">{task.daysToComplete}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        {canStart && (
          <button
            className={`${classNames.actionButton} btn btn-sm btn-primary`}
            onClick={handleStart}
            title="Move task to In Progress"
          >
            Started
          </button>
        )}

        {canComplete && (
          <button
            className={`${classNames.actionButton} btn btn-sm btn-success`}
            onClick={handleComplete}
            title="Move task to Done"
          >
            Completed
          </button>
        )}

        {columnStatus === 'Done' && (
          <span className="status-indicator">✓ Done</span>
        )}
      </div>
    </div>
  )
}

export default TaskCardComponent
