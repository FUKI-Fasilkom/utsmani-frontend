import { CountdownBlock } from './CountdownBlock'

type CountdownTimerProps = {
  days: number
  hours: number
  minutes: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  days,
  hours,
  minutes,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-brown-700 text-lg font-bold">Waktu Donasi tersisa</h1>
      <div className="flex space-x-4">
        <CountdownBlock label="Hari" value={days} />
        <span className="text-brown-700 text-2xl font-bold flex items-center">
          :
        </span>
        <CountdownBlock label="Jam" value={hours} />
        <span className="text-brown-700 text-2xl font-bold flex items-center">
          :
        </span>
        <CountdownBlock label="Menit" value={minutes} />
      </div>
    </div>
  )
}

export default CountdownTimer
