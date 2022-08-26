import { FC, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from 'recharts'
import gasPriceData from '../../json/gas_price.json'
import { NetworkType } from '../../types/NetworkType'
import { timeFormatter } from '../../utils/timeFormatter'
import { Timeframe } from '../../types/Timeframe'

interface ChartProps {
  timeframe: Timeframe
}

const Chart: FC<ChartProps> = () => {
  const [networkData] = useState(gasPriceData)

  const chartData = networkData[NetworkType.ETHEREUM].transactions.slice(0, 1000)

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
        <Brush dataKey="time" startIndex={chartData.length - 51} />
      </LineChart>
    </div>
  )
}

export default Chart
