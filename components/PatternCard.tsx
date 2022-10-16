import Image from 'next/image'
import React from 'react'


export type PatternCardProps = {
    image: string,
    title: string,
    id: string
}
const PatternCard = (props: PatternCardProps) => {
  return (
    <div className='max-w-md flex flex-col rounded-xl transition duration-300 overflow-hidden shadow-sm shadow-primary/30 hover:shadow-lg hover:shadow-primary/30'>
        <div className="w-full h-full">
            <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={props.image} alt={props.title} layout="fill" objectFit="cover"/>
            </div>
        </div>
            <div className='p-3'>
            <h1 className="text-xl line-clamp-1">{props.title}</h1>
            </div>
    </div>
  )
}

export default PatternCard