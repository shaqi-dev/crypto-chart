import { FC, useEffect, useState } from 'react'
import Chart from './components/Chart'
import { getNetworkData } from './api/getNetworkData'
import { API_ETH_NETWORK } from './api/endpoints'
import { filterDay, filterWeek } from './utils/ETHTransactionFilters'
import { reduceETHTransactions } from './utils/reduceETHTransactions'
import { Timeframe } from './types/Timeframe'
import { ChartDataItem } from './types/ChartDataItem'
import { ETHTransaction } from './types/Transactions'

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.H1)
  const [transactions, setTransactions] = useState<ChartDataItem[]>([])
  const [chartData, setChartData] = useState<ChartDataItem[]>(transactions.slice(0, 200))
  const [brushStartIndex, setBrushStartIndex] = useState<number>(0)

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const { data, error } = await getNetworkData<ETHTransaction>(API_ETH_NETWORK)

        if (error) {
          console.error(error)
        }

        if (data) {
          setTransactions(reduceETHTransactions(data.ethereum.transactions))
        }
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }

    fetchTransactions()
  }, [])

  useEffect(() => {
    let data: ChartDataItem[] = []

    if (timeframe === Timeframe.H1) {
      data = transactions.slice(-500)
      setBrushStartIndex(data.length - 101)
    } else if (timeframe === Timeframe.D1) {
      data = transactions.filter(filterDay)
      setBrushStartIndex(data.length - 51)
    } else if (timeframe === Timeframe.W1) {
      data = transactions.filter(filterWeek)
      setBrushStartIndex(0)
    }

    setChartData(data)
  }, [timeframe, transactions])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-xl">
        <span className="font-medium">Time frame: </span>
        <select
          name="timeframe"
          id="timeframe"
          className="cursor-pointer"
          onChange={(e): void => setTimeframe(+e.target.value)}
        >
          <option value={Timeframe.H1}>Last 1 hour</option>
          <option value={Timeframe.D1}>Last 1 day</option>
          <option value={Timeframe.W1}>Last 1 week</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && <Chart chartData={chartData} brushStartIndex={brushStartIndex} />}
    </div>
  )
}

export default App
