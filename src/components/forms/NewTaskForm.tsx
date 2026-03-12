/**
 * Task creation form component
 * Validates required fields and shows non-blocking warning if due date exceeds project goal
 */

import React, { useState } from 'react'
import { calculateDueDate, exceedsProjectGoal, getTodayDateString } from '../../utils/date/kanbanDates'
import './NewTaskForm.css'

interface NewTaskFormProps {
  projectEndGoalDate: string
  onSubmit: (taskData: {
    name: string
    description: string
    startDate: string
    daysToComplete: number
  }) => void
}

interface FormState {
  name: string
  description: string
  startDate: string
  daysToComplete: string
}

interface FormErrors {
  name?: string
  description?: string
  startDate?: string
  daysToComplete?: string
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({
  projectEndGoalDate,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    description: '',
    startDate: getTodayDateString(),
    daysToComplete: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showGoalWarning, setShowGoalWarning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = 'Task name is required'
    }

    if (!formState.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formState.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (!formState.daysToComplete || parseInt(formState.daysToComplete) <= 0) {
      newErrors.daysToComplete = 'Days must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    // Check for goal date warning when daysToComplete or startDate changes
    if (name === 'daysToComplete' || name === 'startDate') {
      updateGoalWarning(name, value)
    }
  }

  const updateGoalWarning = (changedField: string, changedValue: string) => {
    const daysToComplete =
      changedField === 'daysToComplete'
        ? changedValue
        : formState.daysToComplete

    const startDate =
      changedField === 'startDate' ? changedValue : formState.startDate

    if (daysToComplete && startDate) {
      const dueDate = calculateDueDate(startDate, parseInt(daysToComplete))
      const exceeds = exceedsProjectGoal(dueDate, projectEndGoalDate)
      setShowGoalWarning(exceeds)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      onSubmit({
        name: formState.name.trim(),
        description: formState.description.trim(),
        startDate: formState.startDate,
        daysToComplete: parseInt(formState.daysToComplete),
      })

      // Reset form
      setFormState({
        name: '',
        description: '',
        startDate: getTodayDateString(),
        daysToComplete: '',
      })
      setShowGoalWarning(false)
      setErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Create New Task</h3>

      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Task Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={formState.name}
          onChange={handleInputChange}
          placeholder="e.g., Design homepage mockups"
          disabled={isSubmitting}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="description" className="form-label">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          value={formState.description}
          onChange={handleInputChange}
          placeholder="Describe what needs to be done"
          rows={3}
          disabled={isSubmitting}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description}</div>
        )}
      </div>

      <div className="form-row row">
        <div className="form-group col-md-6 mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
            value={formState.startDate}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
          {errors.startDate && (
            <div className="invalid-feedback">{errors.startDate}</div>
          )}
        </div>

        <div className="form-group col-md-6 mb-3">
          <label htmlFor="daysToComplete" className="form-label">
            Days to Complete *
          </label>
          <input
            type="number"
            id="daysToComplete"
            name="daysToComplete"
            className={`form-control ${
              errors.daysToComplete ? 'is-invalid' : ''
            }`}
            value={formState.daysToComplete}
            onChange={handleInputChange}
            placeholder="e.g., 5"
            min="1"
            disabled={isSubmitting}
          />
          {errors.daysToComplete && (
            <div className="invalid-feedback">{errors.daysToComplete}</div>
          )}
        </div>
      </div>

      {showGoalWarning && (
        <div className="alert alert-warning mb-3" role="alert">
          <strong>⚠️ Note:</strong> This task's due date exceeds your project
          goal date. You can still create it, but consider adjusting the dates.
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  )
}

export default NewTaskForm
