import { FC, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from 'recharts'
import gasPriceData from '../../json/gas_price.json'
import { NetworkType } from '../../types/NetworkType'
import { Timeframe } from '../../types/Timeframe'

interface ChartProps {
  timeframe: Timeframe
}

const Chart: FC<ChartProps> = () => {
  const [networkData] = useState(gasPriceData)

  return (
    <ResponsiveContainer width={800} height={500}>
      <LineChart
        width={400}
        height={400}
        data={networkData[NetworkType.ETHEREUM].transactions.slice(0, 200)}
      >
        <Line type="monotone" dataKey="gasPrice" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Brush />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
