import React, { PropsWithChildren, useEffect, useState } from 'react'
import {MdClose} from 'react-icons/md'
export type AppToasProps = {
    timeOut?: number;
    type?: 'error'|'warning'|'info'
}
const typesList = [
    {type: 'error', className: 'bg-error/20 text-error-content'},
    {type: 'warning', className: 'bg-warning/20 text-warning-content'},
    {type: 'info', className: 'bg-info/20 text-info-content'},
]
const AppToast = (props: PropsWithChildren<AppToasProps>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const close = () => setIsOpen(false);

    useEffect(() => {
      
    }, [])
    
  return (
    <div className={`rounded-xl flex gap-2 ${props.type && typesList.find(type => type.type === props.type)?typesList.find(type => type.type === props.type)?.className:'bg-neutral text-neutral-content'}`}>
        <div className="text-lg">{props.children}</div>
        <div className="flex items-center justify-center h-max">
            <button className='btn btn-square btn-outline' onClick={close}><MdClose/></button>
        </div>
    </div>
  )
}

export default AppToast