export const timeFormatter = (value: string): string => {
  const time = value.slice(-5)
  const date = value.slice(0, 8)
  const year = date.slice(0, 2)
  const month = date.slice(3, 5)
  const day = date.slice(-2)
  const monthShort = Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(month))
  const yearLong = +year[0] > 5 ? `19${year}` : `20${year}`

  if (time !== '00:00') {
    return time
  }

  if (day !== '01') {
    return day.replace('0', '')
  }

  if (month !== '01') {
    return monthShort
  }

  return yearLong
}
