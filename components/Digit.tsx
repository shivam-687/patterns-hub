import React, { PropsWithChildren, useEffect, useState } from 'react'

export type DigitProps = {
    text: string,
    hideSpace?: boolean;
    isActive?: boolean
}


function Digit(props: PropsWithChildren<DigitProps>) {
    const [boxes, setBoxes] = useState<string[]>([]);

    useEffect(() => {
        setBoxes(props.text.split(''));
        // console.log("Boxes: ", boxes);
    }, [props.text])
    
  return (
    <div className={`border ${props.isActive ? 'border-primary': 'border-transparent'}`}>
        {
            boxes.map((b, index) => {
                return <span className={`
                  transition-all
                border-gray-300 
                  w-6 h-6 inline-flex 
                  items-center text-lg j
                  ustify-center 
                  ${props.hideSpace && b === '_'?'invisible':'visible'}
                  `} key={index}
                  
                  >{b}</span>
            })
        }
    </div>
  )
}

export default Digit