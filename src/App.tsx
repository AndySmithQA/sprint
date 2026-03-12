
import { useReducer, useEffect } from 'react'
import './App.css'
import type { WorkflowStatus } from './models/kanban'
import { boardReducer } from './models/kanbanReducer'
import { loadBoardState, saveBoardState } from './utils/storage/kanbanStorage'
import KanbanBoard from './components/board/KanbanBoard'
import NewTaskForm from './components/forms/NewTaskForm'
import ProjectHeader from './components/header/ProjectHeader'

function App() {
  // Initialize state from localStorage
  const [boardState, dispatch] = useReducer(boardReducer, undefined, () => {
    return loadBoardState()
  })

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    saveBoardState(boardState)
  }, [boardState])

  // Handle task creation from form
  const handleCreateTask = (taskData: {
    name: string
    description: string
    startDate: string
    daysToComplete: number
  }) => {
    dispatch({
      type: 'CREATE_TASK',
      payload: {
        ...taskData,
        dueDate: '', // Will be computed in reducer
      },
    })
  }

  // Handle task status change
  const handleMoveTask = (taskId: string, newStatus: WorkflowStatus) => {
    dispatch({
      type: 'MOVE_TASK',
      payload: {
        taskId,
        newStatus,
      },
    })
  }

  // Handle project title update
  const handleUpdateProjectTitle = (title: string) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: {
        title,
      },
    })
  }

  // Handle project end goal date update
  const handleUpdateProjectEndGoalDate = (endGoalDate: string) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: {
        endGoalDate,
      },
    })
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Kanban Task Flow Board</h1>
        {boardState && (
          <ProjectHeader
            title={boardState.projectBoard.title}
            endGoalDate={boardState.projectBoard.endGoalDate}
            onUpdateTitle={handleUpdateProjectTitle}
            onUpdateEndGoalDate={handleUpdateProjectEndGoalDate}
          />
        )}
      </header>
      <main className="app-main">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-9">
              <KanbanBoard
                tasks={boardState?.taskCards || []}
                onMoveTask={handleMoveTask}
              />
            </div>
            <div className="col-lg-3">
              <div className="sidebar">
                <NewTaskForm
                  projectEndGoalDate={boardState?.projectBoard?.endGoalDate || new Date().toISOString().split('T')[0]}
                  onSubmit={handleCreateTask}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App