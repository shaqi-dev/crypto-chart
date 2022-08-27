import { getETHTransactionDate } from './getETHTransactionDate'
import { ChartDataItem } from '../types/ChartDataItem'

export const filterDay = (transaction: ChartDataItem): boolean =>
  transaction.time.slice(-5) === '00:00'

export const filterWeek = ({ time }: ChartDataItem): boolean => {
  const date = getETHTransactionDate(time)
  const day = date.getDay()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return day === 1 && hours === 0 && minutes === 0
}
