import { FC, useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from 'recharts'
import gasPriceData from '../../json/gas_price.json'
import { timeFormatter } from '../../utils/timeFormatter'
import { filterDay, filterWeek } from '../../utils/ETHTransactionFilters'
import { NetworkType } from '../../types/NetworkType'
import { ETHTransaction } from '../../types/ETHTransaction'
import { Timeframe } from '../../types/Timeframe'

interface ChartProps {
  timeframe: Timeframe
}

const Chart: FC<ChartProps> = ({ timeframe }) => {
  const [networkData] = useState(gasPriceData)
  const [chartData, setChartData] = useState<ETHTransaction[]>(
    networkData[NetworkType.ETHEREUM].transactions.slice(0, 200),
  )

  useEffect(() => {
    let data: ETHTransaction[] = []

    if (timeframe === Timeframe.H1) {
      data = networkData[NetworkType.ETHEREUM].transactions.slice(0, 200)
    } else if (timeframe === Timeframe.D1) {
      data = networkData[NetworkType.ETHEREUM].transactions.filter(filterDay)
    } else if (timeframe === Timeframe.W1) {
      data = networkData[NetworkType.ETHEREUM].transactions.filter(filterWeek)
    }

    setChartData(data)
  }, [networkData, timeframe])

  return (
    <div>
      <LineChart width={600} height={400} data={chartData}>
        <Line
          isAnimationActive={false}
          dot={false}
          type="monotone"
          dataKey="gasPrice"
          stroke="#8884d8"
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" minTickGap={40} tickFormatter={timeFormatter} />
        <YAxis />
        <Tooltip />
        <Brush dataKey="time" startIndex={chartData.length - 21} />
      </LineChart>
    </div>
  )
}

export default Chart
