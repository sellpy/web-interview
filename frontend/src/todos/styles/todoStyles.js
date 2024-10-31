export const BACKGROUND_COLORS = {
  completed: 'rgba(76, 175, 80, 0.1)', // green
  completedLate: 'rgba(255, 152, 0, 0.1)', // orange
  overdue: 'rgba(244, 67, 54, 0.1)', // red
  dueSoon: 'rgba(255, 152, 0, 0.1)', // orange
}

export const getInputStyle = (todo, isNew) => {
  if (isNew) return {}

  if (todo.completed && todo.dueDate) {
    const dueDate = new Date(todo.dueDate)
    const completedDate = new Date(todo.completedAt)
    return {
      '& .MuiOutlinedInput-root': {
        backgroundColor:
          completedDate <= dueDate ? BACKGROUND_COLORS.completed : BACKGROUND_COLORS.completedLate,
      },
    }
  }

  if (!todo.dueDate) return {}

  const now = new Date()
  const dueDate = new Date(todo.dueDate)
  const diffHours = (dueDate - now) / (1000 * 60 * 60)

  if (dueDate < now) {
    return {
      '& .MuiOutlinedInput-root': {
        backgroundColor: BACKGROUND_COLORS.overdue,
      },
    }
  }

  if (diffHours <= 24) {
    return {
      '& .MuiOutlinedInput-root': {
        backgroundColor: BACKGROUND_COLORS.dueSoon,
      },
    }
  }

  return {}
}
