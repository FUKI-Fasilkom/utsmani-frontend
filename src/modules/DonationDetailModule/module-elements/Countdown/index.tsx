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
    <div className="w-full flex space-x-4 items-center justify-center px-4">
      <CountdownBlock label="Hari" value={days} />
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold flex items-center">
        :
      </span>
      <CountdownBlock label="Jam" value={hours} />
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold flex items-center">
        :
      </span>
      <CountdownBlock label="Menit" value={minutes} />
    </div>
  )
}

export default CountdownTimer
