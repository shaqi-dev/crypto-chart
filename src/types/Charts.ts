export interface Transaction {
  time: string
  gasPrice: number
  gasValue: number
  average: number
  maxGasPrice: number
  medianGasPrice: number
}

enum NetworkType {
  ETHEREUM = 'ethereum',
}

export type ChartData = {
  [key in NetworkType]: Transaction[]
}
