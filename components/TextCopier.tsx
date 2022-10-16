import React, { ChangeEvent, useRef } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify';


const TextCopier = (props: {text?: string}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const copy = async() => {
        if(props.text && props.text != ''){
            await navigator.clipboard.writeText(props.text);
            console.log("Input data", props.text);
            toast("Code Copied", {type: 'success'});
        }
    }

    const handleChnage = (ev: ChangeEvent<HTMLInputElement>) =>{

    }
  return (
   <>
    
    <button className='btn btn-square btn-primary btn-outline btn-sm text-xl md:text-xl' onClick={copy}><MdOutlineContentCopy /></button>
   </>
  )
}

export default TextCopier