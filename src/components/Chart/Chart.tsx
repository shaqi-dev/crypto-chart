import { FC } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from 'recharts'
import { ChartDataItem } from '../../types/ChartDataItem'
import { timeFormatter } from '../../utils/timeFormatter'

interface ChartProps {
  chartData: ChartDataItem[]
}

const Chart: FC<ChartProps> = ({ chartData }) => {
  return (
    <LineChart width={600} height={400} data={chartData}>
      <Line
        isAnimationActive={false}
        dot={false}
        type="monotone"
        dataKey="price"
        stroke="#8884d8"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="time" minTickGap={40} tickFormatter={timeFormatter} />
      <YAxis />
      <Tooltip />
      <Brush dataKey="time" startIndex={chartData.length - 21} />
    </LineChart>
  )
}

export default Chart
