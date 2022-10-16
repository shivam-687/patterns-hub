import React from 'react'
import { NavLink } from './Navlink'
import SectionTitle from './SectionTitle'

export type SectionHeaderProps = {
    link?: string,
    linkText?: string
    title: string
}

function SectionHeader(props: SectionHeaderProps) {
  return (
    <div className='w-full flex items-center justify-between mb-14'>
        <SectionTitle>{props.title}</SectionTitle>
        {
            props.link && <NavLink href={props.link}>
                <a className='btn btn-primary'>{props.linkText || 'See More'}</a>
            </NavLink>
        }
    </div>
  )
}

export default SectionHeader