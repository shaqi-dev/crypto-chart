import { getETHTransactionDate } from './getETHTransactionDate'

export const timeFormatter = (time: string): string => {
  const date = getETHTransactionDate(time)
  const minutes = date.getMinutes().toLocaleString('en', { minimumIntegerDigits: 2 })
  const hours = date.getHours().toLocaleString('en', { minimumIntegerDigits: 2 })
  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.toLocaleString('en', { month: 'short' })

  if (minutes !== '00' || hours !== '00') {
    return `${hours}:${minutes}`
  }

  if (day !== 1) {
    return day.toString()
  }

  if (month !== 'Jan') {
    return month
  }

  return year.toString()
}
