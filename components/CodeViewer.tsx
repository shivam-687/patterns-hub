import React, { ChangeEvent, useEffect, useState } from 'react'
import { CodeData, ProcessHistory } from '../lib/Question'
import { StringRenderer } from '../lib/StringRenderer'
import Code from './Code'
import { MdOutlineContentCopy } from 'react-icons/md'
import TextCopier from './TextCopier'

export type CodeViewerProps = {
    process?: ProcessHistory
    codeData?: CodeData[]
}

const CodeViewer = (props: CodeViewerProps) => {

    const DEFAULT_LANG = 'javascript';
    const [codeStr, setCodeStr] = useState<string>('');
    const [defaultCodeStr, setDefaultCodeStr] = useState<string>('');
    const [isDynamicView, setIsDynamicView] = useState<boolean>(true);
    const [allCodeData, setAllCodeData] = useState<CodeData[]>();
    const [currentCodeData, setCurrentCodeData] = useState<CodeData>();
    const [currentCodeLang, setCurrentCodeLang] = useState<string>(DEFAULT_LANG);
    const [highlitedLines, setHighlitedLines] = useState<number[]>([])
    useEffect(() => {
        run();
    }, [props.process, props.codeData, currentCodeData])


    const run = () => {
        if (props.process && props.codeData) {
            setAllCodeData(props.codeData);
            const currentCd = props.codeData.find(cd => {
                return cd.lang === currentCodeLang;
            })
            if (!currentCd) {
                console.error(`${currentCodeLang} is not found in code data`);
                setHighlitedLines([]);
                setDefaultCodeStr('');
                setCodeStr('');
            } else {
                setCurrentCodeData(currentCd);
                const actLine = currentCd.map[props.process.stepNumber + ''] || [];
                setHighlitedLines(actLine);
                const cds = StringRenderer(currentCd.codeTemplate, props.process.dynamicValue || {});
                setCodeStr(cds);
            }
            // console.log("Dynamic Value: ", props.process.dynamicValue)
        }
    }


    useEffect(() => {
        if (currentCodeData) {
            const dcstr = StringRenderer(currentCodeData.codeTemplate, {});
            setDefaultCodeStr(dcstr);
        }
    }, [currentCodeData])

    useEffect(() => {
        if(currentCodeData?.lang !== currentCodeLang){
            run();
        }
    }, [currentCodeLang])
    

    const handleToggleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setIsDynamicView(ev.target.checked);
    }

    const handleCodeChange = (ev: ChangeEvent<HTMLSelectElement>)=> {
        setCurrentCodeLang(ev.target.value);
    }


    return (
        <div>
            <div className='relative text-xs md:text-sm' >
                <div className='absolute top-0 right-0 flex justify-end'>
                    <div className="w-min flex items-center justify-end gap-2 bg-black/10 backdrop-blur-sm px-5">
                        <select className="select select-bordered select-sm w-full max-w-xs" onChange={handleCodeChange}>
                            
                            {
                                allCodeData?.map((d, index) => {
                                    return <option value={d.lang} className='capitalize' selected={d.lang === currentCodeData?.lang} key={index}>{d.lang}</option>
                                })
                            }
                           
                        </select>
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
                    {isDynamicView ? codeStr || defaultCodeStr : defaultCodeStr}
                </Code>
            </div>
        </div>
    )
}

export default CodeViewer