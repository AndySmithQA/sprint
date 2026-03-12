/**
 * Main Kanban board component with three columns: Todo, In Progress, Done
 * Uses Bootstrap grid for responsive even distribution
 */

import React from 'react'
import type { TaskCard, WorkflowStatus } from '../../models/kanban'
import { classNames } from './boardTheme'
import TaskCardComponent from '../cards/TaskCard'
import './KanbanBoard.css'

interface KanbanBoardProps {
  tasks: TaskCard[]
  onMoveTask: (taskId: string, newStatus: WorkflowStatus) => void
}

const COLUMNS: Array<{ status: WorkflowStatus; label: string; icon: string }> =
  [
    { status: 'Todo', label: 'To Do', icon: '📋' },
    { status: 'InProgress', label: 'In Progress', icon: '⚙️' },
    { status: 'Done', label: 'Done', icon: '✅' },
  ]

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onMoveTask }) => {
  const tasksByStatus: Record<WorkflowStatus, TaskCard[]> = {
    Todo: tasks.filter((t) => t.status === 'Todo'),
    InProgress: tasks.filter((t) => t.status === 'InProgress'),
    Done: tasks.filter((t) => t.status === 'Done'),
  }

  return (
    <div className={`${classNames.board} container-fluid`}>
      <div className="row g-3">
        {COLUMNS.map((column) => (
          <div key={column.status} className="col-12 col-lg-4">
            <div className={`${classNames.column} column-${column.status.toLowerCase()}`}>
              <div className="column-header">
                <h3 className="column-title">
                  <span className="column-icon">{column.icon}</span>
                  {column.label}
                </h3>
                <span className="column-count badge bg-secondary">
                  {tasksByStatus[column.status].length}
                </span>
              </div>

              <div className="column-content">
                {tasksByStatus[column.status].length === 0 ? (
                  <div className="empty-state">
                    <p className="empty-state-text">
                      {column.status === 'Todo' && 'No tasks yet. Create one to get started!'}
                      {column.status === 'InProgress' &&
                        'No tasks in progress. Start a task to move it here.'}
                      {column.status === 'Done' && 'No completed tasks yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="tasks-list">
                    {tasksByStatus[column.status].map((task) => (
                      <TaskCardComponent
                        key={task.id}
                        task={task}
                        columnStatus={column.status}
                        onMoveTask={onMoveTask}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KanbanBoard
