import { FC } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from 'recharts'
import { timeFormatter } from '../../utils/timeFormatter'
import { ETHTransaction } from '../../types/ETHTransaction'

interface ChartProps {
  chartData: ETHTransaction[]
}

const Chart: FC<ChartProps> = ({ chartData }) => {
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
