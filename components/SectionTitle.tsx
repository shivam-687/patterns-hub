import React, { PropsWithChildren } from 'react'

function SectionTitle(props: PropsWithChildren<{}>) {
  return (
    <h2 className='text-3xl md:text-4xl ubuntu font-bold'>{props.children}</h2>
  )
}

export default SectionTitle