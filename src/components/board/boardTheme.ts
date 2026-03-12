/**
 * Light-theme design tokens and layout constants for Kanban board
 * Ensures consistent styling across components
 */

export const colors = {
  // Status states for visual feedback
  inScope: '#28a745', // Green: task is within schedule
  overdue: '#dc3545', // Red: task is past due date
  completed: '#6c757d', // Gray: task is done

  // Column backgrounds
  todoBackground: '#f8f9fa',
  inProgressBackground: '#e7f3ff',
  doneBackground: '#f0f0f0',

  // Text colors
  textPrimary: '#212529',
  textSecondary: '#6c757d',
  textMuted: '#999999',

  // Component states
  borderColor: '#dee2e6',
  focusColor: '#0c63e4',
  warningColor: '#ffc107',
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const

export const typography = {
  headerFontSize: '24px',
  columnHeaderFontSize: '18px',
  cardTitleFontSize: '16px',
  cardTextFontSize: '14px',
  labelFontSize: '12px',
} as const

export const layout = {
  // Three-column board
  columnCount: 3,

  // Responsive breakpoints
  mobileBreakpoint: '576px', // Bootstrap sm
  tabletBreakpoint: '768px', // Bootstrap md
  desktopBreakpoint: '992px', // Bootstrap lg

  // Column widths (percentage of container)
  columnWidthDesktop: '31%', // Even distribution: (100% - 2% gaps) / 3
  columnWidthMobile: '100%',

  // Border radius for cards
  cardBorderRadius: '8px',
  inputBorderRadius: '4px',
} as const

export const shadows = {
  card: '0 1px 3px rgba(0, 0, 0, 0.1)',
  cardHover: '0 4px 8px rgba(0, 0, 0, 0.15)',
  button: 'none',
} as const

/**
 * CSS class names for consistent styling
 */
export const classNames = {
  board: 'kanban-board',
  column: 'kanban-column',
  card: 'kanban-card',
  cardOverdue: 'kanban-card--overdue',
  cardCompleted: 'kanban-card--completed',
  cardInScope: 'kanban-card--in-scope',
  actionButton: 'kanban-action-btn',
  warningBanner: 'kanban-warning',
} as const
