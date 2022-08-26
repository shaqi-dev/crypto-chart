import { FC, useState } from 'react'
import Chart from './components/Chart'
import { Timeframe } from './types/Timeframe'

const App: FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.H1)

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

      <Chart timeframe={timeframe} />
    </div>
  )
}

export default App
