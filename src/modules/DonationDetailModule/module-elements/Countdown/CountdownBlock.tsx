import React from 'react'

type CountdownBlockProps = {
  label: string
  value: string | number
}

export const CountdownBlock: React.FC<CountdownBlockProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <span>{label}</span>
      <div className="bg-gray-100 w-full aspect-square flex justify-center items-center rounded-2xl drop-shadow-lg">
        <span className="text-5xl font-bold">{value}</span>
      </div>
    </div>
  )
}
