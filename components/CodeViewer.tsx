import React, { ChangeEvent, useEffect, useState } from 'react'
import { CodeData, ProcessHistory } from '../lib/Question'
import { StringRenderer } from '../lib/StringRenderer'
import Code from './Code'
import { MdOutlineContentCopy } from 'react-icons/md'
import TextCopier from './TextCopier'

export type CodeViewerProps = {
    process?: ProcessHistory
    codeData?: CodeData
}

const CodeViewer = (props: CodeViewerProps) => {

    const [codeStr, setCodeStr] = useState<string>('');
    const [defaultCodeStr, setDefaultCodeStr] = useState<string>('');
    const [isDynamicView, setIsDynamicView] = useState<boolean>(true);

    const [highlitedLines, setHighlitedLines] = useState<number[]>([])
    useEffect(() => {
        if (props.process && props.codeData) {
            const actLine = props.codeData.map[props.process.stepNumber + ''] || [];
            setHighlitedLines(actLine);
            const cds = StringRenderer(props.codeData.codeTemplate, props.process.dynamicValue || {});
            setCodeStr(cds);
            // console.log("Dynamic Value: ", props.process.dynamicValue)
        }
    }, [props.process, props.codeData])


    useEffect(() => {
        if (props.codeData) {
            const dcstr = StringRenderer(props.codeData.codeTemplate, {});
            setDefaultCodeStr(dcstr);
        }
    }, [props.codeData])

    const handleToggleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setIsDynamicView(ev.target.checked);
    }

    return (
        <div>
            <div className='relative text-xs md:text-sm text-white' >
                <div className='absolute top-0 right-0 flex justify-end'>
                <div className="w-min flex items-center justify-end gap-2 bg-black/10 backdrop-blur-sm px-5">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-1 text-white">{isDynamicView ? 'Dynamic' : 'Static'}</span>
                            <input type="checkbox" className="toggle toggle-primary" checked={isDynamicView} onChange={handleToggleChange} />
                        </label>
                    </div>
                    <TextCopier text={defaultCodeStr} />
                </div>
                </div>
                <Code highlite={highlitedLines}>
                    {isDynamicView?codeStr || defaultCodeStr: defaultCodeStr}
                </Code>
            </div>
        </div>
    )
}

export default CodeViewer