import { FC, useEffect, useState } from 'react'
import Chart from './components/Chart'
import { filterDay, filterWeek } from './utils/ETHTransactionFilters'
import gasPriceData from './json/gas_price.json'
import { Timeframe } from './types/Timeframe'
import { ChartDataItem } from './types/ChartDataItem'

const reducedGasPriceData: ChartDataItem[] = gasPriceData.ethereum.transactions.map(
  ({ time, gasPrice, gasValue, average, maxGasPrice, medianGasPrice }) => ({
    time,
    price: gasPrice + gasValue + average + average + maxGasPrice + medianGasPrice,
  }),
)

const App: FC = () => {
  const [transactions] = useState(reducedGasPriceData)
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.H1)
  const [chartData, setChartData] = useState<ChartDataItem[]>(transactions.slice(0, 200))
  const [brushStartIndex, setBrushStartIndex] = useState<number>(0)

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

      <Chart chartData={chartData} brushStartIndex={brushStartIndex} />
    </div>
  )
}

export default App
