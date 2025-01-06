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
    <div className="flex flex-col items-center w-full max-w-[48px] md:max-w-[64px] lg:max-w-[80px]">
      <span>{label}</span>
      <div className="bg-gray-100 w-full aspect-square flex justify-center items-center rounded-lg md:rounded-xl lg:rounded-2xl drop-shadow-lg">
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {value}
        </span>
      </div>
    </div>
  )
}
