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
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 w-20 h-20 flex justify-center items-center rounded-md shadow">
        <span className="text-brown-700 text-2xl font-bold">{value}</span>
      </div>
      <span className="text-brown-700 text-sm mt-2">{label}</span>
    </div>
  )
}
