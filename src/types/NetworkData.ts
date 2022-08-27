import { NetworkType } from './NetworkType'
import { Transaction } from './Transactions'

export type NetworkData<T extends Transaction> = {
  [key in NetworkType]: {
    transactions: T[]
  }
}
