import Image from 'next/image'
import React from 'react'

const PatterNotFound = () => {
  return (
    <div>
        <Image src={'/assets/images/notfound.png'} width={300} height={300} alt="Pattern not found"></Image>
    </div>
  )
}

export default PatterNotFound