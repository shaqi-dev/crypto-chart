export interface Transaction {
  time: string
}

export interface ETHTransaction extends Transaction {
  gasPrice: number
  gasValue: number
  average: number
  maxGasPrice: number
  medianGasPrice: number
}
