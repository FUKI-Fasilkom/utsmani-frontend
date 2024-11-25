import React from 'react'
import { IconProps } from './interface'

export const Email: React.FC<IconProps> = ({
  className,
  size = 'w-[24px]',
  fill = 'fill-white',
}) => {
  return (
    <svg
      className={`${className} ${size}`}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 23C3.88125 23 3.35175 22.7799 2.9115 22.3396C2.47125 21.8994 2.25075 21.3695 2.25 20.75V7.25C2.25 6.63125 2.4705 6.10175 2.9115 5.6615C3.3525 5.22125 3.882 5.00075 4.5 5H22.5C23.1187 5 23.6486 5.2205 24.0896 5.6615C24.5306 6.1025 24.7507 6.632 24.75 7.25V20.75C24.75 21.3687 24.5299 21.8986 24.0896 22.3396C23.6494 22.7806 23.1195 23.0007 22.5 23H4.5ZM13.5 15.125L22.5 9.5V7.25L13.5 12.875L4.5 7.25V9.5L13.5 15.125Z"
        className={fill}
      />
    </svg>
  )
}
