import { ChartDataItem } from '../types/ChartDataItem'
import { ETHTransaction } from '../types/Transactions'

export const reduceETHTransactions = (transactions: ETHTransaction[]): ChartDataItem[] =>
  transactions.map(({ time, gasPrice, gasValue, average, maxGasPrice, medianGasPrice }) => ({
    time,
    price: gasPrice + gasValue + average + average + maxGasPrice + medianGasPrice,
  }))
