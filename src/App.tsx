import { FC, useEffect, useState } from 'react'
import Chart from './components/Chart'
import { ETHTransaction } from './types/ETHTransaction'
import { NetworkType } from './types/NetworkType'
import { Timeframe } from './types/Timeframe'
import { filterDay, filterWeek } from './utils/ETHTransactionFilters'
import gasPriceData from './json/gas_price.json'

const App: FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.H1)
  const [networkType] = useState<NetworkType>(NetworkType.ETHEREUM)
  const [networkData] = useState(gasPriceData)
  const [chartData, setChartData] = useState<ETHTransaction[]>(
    networkData[networkType].transactions.slice(0, 200),
  )

  useEffect(() => {
    let data: ETHTransaction[] = []

    if (timeframe === Timeframe.H1) {
      data = networkData[networkType].transactions.slice(0, 200)
    } else if (timeframe === Timeframe.D1) {
      data = networkData[networkType].transactions.filter(filterDay)
    } else if (timeframe === Timeframe.W1) {
      data = networkData[networkType].transactions.filter(filterWeek)
    }

    setChartData(data)
  }, [networkData, timeframe, networkType])

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

      <Chart chartData={chartData} />
    </div>
  )
}

export default App
