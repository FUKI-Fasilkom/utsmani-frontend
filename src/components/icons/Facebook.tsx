import React from 'react'
import { IconProps } from './interface'

export const Facebook: React.FC<IconProps> = ({
  className,
  size = 'w-[24px]',
  fill = 'fill-white',
}) => {
  return (
    <svg
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${size}`}
    >
      <path
        d="M24.6094 12.625C24.6094 18.6797 20.166 23.709 14.3555 24.5879V16.1406H17.1875L17.7246 12.625H14.3555V10.3789C14.3555 9.40234 14.8438 8.47461 16.3574 8.47461H17.8711V5.49609C17.8711 5.49609 16.5039 5.25195 15.1367 5.25195C12.4023 5.25195 10.5957 6.96094 10.5957 9.98828V12.625H7.51953V16.1406H10.5957V24.5879C4.78516 23.709 0.390625 18.6797 0.390625 12.625C0.390625 5.93555 5.81055 0.515625 12.5 0.515625C19.1895 0.515625 24.6094 5.93555 24.6094 12.625Z"
        className={fill}
      />
    </svg>
  )
}
