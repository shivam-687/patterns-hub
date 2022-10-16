import React, { PropsWithChildren } from 'react'


export type ByteProps = {
  data: string
  hideSpace?: boolean;
  border?: boolean;
  isActive?: boolean;
}
const Byte = (props: PropsWithChildren<ByteProps>) => {
  return (
    <span className={`
    byte 
    ${props.border?'border border-gray-300':''}
    ${props.isActive&&'outline outline-primary'} 
    transition-all
    w-6 h-6 
    inline-flex 
    items-center 
    text-lg 
    justify-center
    text-[#FFCACA]
    `}>{props.data}</span>
  )
}

export default Byte