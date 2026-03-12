/**
 * Project header component for editing project title and goal date
 * Displays and persists project metadata
 */

import React, { useState } from 'react'
import { getTodayDateString } from '../../utils/date/kanbanDates'
import './ProjectHeader.css'

interface ProjectHeaderProps {
  title: string
  endGoalDate: string
  onUpdateTitle: (title: string) => void
  onUpdateEndGoalDate: (date: string) => void
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  endGoalDate,
  onUpdateTitle,
  onUpdateEndGoalDate,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editTitleValue, setEditTitleValue] = useState(title)

  const [isEditingDate, setIsEditingDate] = useState(false)
  const [editDateValue, setEditDateValue] = useState(endGoalDate)

  const handleSaveTitle = () => {
    if (editTitleValue.trim()) {
      onUpdateTitle(editTitleValue.trim())
      setIsEditingTitle(false)
    }
  }

  const handleCancelTitle = () => {
    setEditTitleValue(title)
    setIsEditingTitle(false)
  }

  const handleSaveDate = () => {
    if (editDateValue) {
      onUpdateEndGoalDate(editDateValue)
      setIsEditingDate(false)
    }
  }

  const handleCancelDate = () => {
    setEditDateValue(endGoalDate)
    setIsEditingDate(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveTitle()
    } else if (e.key === 'Escape') {
      handleCancelTitle()
    }
  }

  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveDate()
    } else if (e.key === 'Escape') {
      handleCancelDate()
    }
  }

  return (
    <div className="project-header">
      <div className="header-content">
        {/* Project Title Section */}
        <div className="header-field">
          <label className="field-label">Project Title</label>
          {isEditingTitle ? (
            <div className="field-edit">
              <input
                type="text"
                className="field-input"
                value={editTitleValue}
                onChange={(e) => setEditTitleValue(e.target.value)}
                onKeyDown={handleTitleKeyDown}
                autoFocus
                maxLength={100}
              />
              <div className="button-group">
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleSaveTitle}
                  title="Save title"
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleCancelTitle}
                  title="Cancel editing"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="field-display">
              <span className="field-value">{title}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsEditingTitle(true)}
                title="Edit project title"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Project End Goal Date Section */}
        <div className="header-field">
          <label className="field-label">End Goal Date</label>
          {isEditingDate ? (
            <div className="field-edit">
              <input
                type="date"
                className="field-input"
                value={editDateValue}
                onChange={(e) => setEditDateValue(e.target.value)}
                onKeyDown={handleDateKeyDown}
                autoFocus
                min={getTodayDateString()}
              />
              <div className="button-group">
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleSaveDate}
                  title="Save goal date"
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleCancelDate}
                  title="Cancel editing"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="field-display">
              <span className="field-value">
                {new Date(endGoalDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsEditingDate(true)}
                title="Edit end goal date"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectHeader
