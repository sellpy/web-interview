const formatTimeRemaining = (dueDate) => {
  if (!dueDate) return null

  const due = new Date(dueDate)
  const now = new Date()

  if (isNaN(due.getTime())) return 'Invalid date'

  const isPast = due < now
  const diffTime = Math.abs(due - now)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))

  if (isPast) {
    if (diffDays > 1) return `Overdue by ${diffDays} days`
    if (diffHours > 1) return `Overdue by ${diffHours} hours`
    return 'Overdue'
  }

  if (diffDays > 1) return `Due in ${diffDays} days`
  if (diffHours > 1) return `Due in ${diffHours} hours`
  return 'Due soon'
}

const formatDate = (date) => {
  if (!date) return ''

  const d = new Date(date)
  if (isNaN(d.getTime())) return 'Invalid date'

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const getInputLabel = (todo, isNew) => {
  if (isNew) return 'What to do?'
  if (!todo.dueDate) return 'No due date set'
  if (todo.completed) return `Completed ${formatDate(todo.completedAt)}`

  return formatTimeRemaining(todo.dueDate)
}
