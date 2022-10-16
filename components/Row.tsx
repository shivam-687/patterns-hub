import React from 'react'
import Byte from './Byte';


export type RowProps = {
    data: string[];
    isActive?: boolean;
}
const Row = (props: RowProps) => {
  return (
    <div className={`
    flex items-center
    border
    transition
    ${props.isActive ? 'border-primary': 'border-transparent'}
    `}>
        {
            props.data.map((d, index)=> {
                return <Byte data={d} key={index}/>
            })
        }
    </div>
  )
}

export default Row