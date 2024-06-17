import { isBefore, parseISO } from 'date-fns'

export function isDateOverdue(dueDate, currentDate = new Date().toISOString()) {
  return isBefore(parseISO(dueDate), parseISO(currentDate))
}
