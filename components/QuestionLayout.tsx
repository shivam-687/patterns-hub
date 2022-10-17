import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import PatternVisualizer, { UpdateResult } from './PatternVisualizer';
import { ProcessHistory, Question, QuestionError } from '../lib/Question';
import CodeViewer from './CodeViewer';
import Link from 'next/link';
import { getNextAndPrev, Patterns } from '../lib/questions';


const QuestionLayout = (props: { question: Question, patternId: string }) => {
    const [inputData, setInputData] = useState<number>(props.question.info().default_input || 0);
    const [inputValue, setInputValue] = useState<string>(`${props.question.info().default_input}` || '');
    const [error, setError] = useState<QuestionError | null>();
    const [view, setView] = useState<'code' | 'result'>('result');
    const [historyArray, setHistoryArray] = useState<ProcessHistory[]>([]);
    const [currentHistory, setCurrentHistory] = useState<ProcessHistory | null>(null)
    const [activeCode, setActiveCode] = useState<number>(0);
    const [isRunnning, setIsRuning] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0)
    const [nextPrevPattern, setNextPrevPattern] = useState<{next: string|undefined, prev: string|undefined}>()

    const generate = async () => {
        setHistoryArray([])
        const q = props.question;
        q.setInput(inputData);
        const his = q.exec();
        setHistoryArray(his)
        // console.log("History: ", his)
    }

    const validate = (input: string) => {
        return inputValue != ''
            && inputValue != '0'
            && !isNaN(parseInt(inputValue))
    }

    const validateWithValidator = (input: string) => {
        const res = props.question.validateInput(parseInt(input));
        if (res) setError(res);
        return res;
    }

    const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setInputValue(ev.target.value);
    }


    useEffect(() => {
        setHistoryArray([])
        generate()
        savePrevNext()
    }, [])

    useEffect(() => {
        if (!validateWithValidator(inputValue)) {
            setError(null);
            setInputData(parseInt(inputValue));
        }
    }, [inputValue])


    const savePrevNext = () => {
        const np = getNextAndPrev(parseInt(props.patternId))
        console.log("Save prev: ", np)
        setNextPrevPattern(np);
    }

    const onUpdate = (data: UpdateResult | null) => {
        setCurrentHistory(data);
        if (data) {
            setActiveCode(data.stepNumber);
            setProgress(data.progress);
        } else {
            setActiveCode(0);
            isCompleted ? setProgress(100) : setProgress(0);
        }
    }

    const toggleCode = () => {
        if (view === 'code') setView('result')
        if (view === 'result') setView('code')
    }

    const handleOnComplete = (isCompleted: boolean) => {
        setIsCompleted(isCompleted)
    }

    const handleOnPlaying = (playing: boolean) => {
        setIsRuning(playing);
    }



    return (
        <div className='container px:1 md:px-10 mx-auto '>

            <div className="flex flex-col gap-5 h-[calc(100vh-100px)] overflow-hidden pb-10">
                <div className=" flex-grow-0 flex items-center justify-between">
                    <h1 className='text-2xl flex-grow mb-2'>{props.question.info().title || 'Question'}</h1>

                    <div className="flex gap-5">
                        {/* <Link href={nextPrevPattern&&nextPrevPattern.prev?`/patterns/${nextPrevPattern.prev}`:'#'}> */}
                            <a href={nextPrevPattern&&nextPrevPattern.prev?`/patterns/${nextPrevPattern.prev}`:'#'}><button className='btn btn-outline' disabled={!nextPrevPattern || !nextPrevPattern.prev}>Prev</button></a>
                        {/* </Link> */}
                        {/* <Link href={nextPrevPattern&&nextPrevPattern.next?`/patterns/${nextPrevPattern.next}`:'#'}> */}
                        <a href={nextPrevPattern&&nextPrevPattern.next?`/patterns/${nextPrevPattern.next}`:'#'} className={`${(!nextPrevPattern || !nextPrevPattern.next)?'pointer-events-none':'pointer-events-auto'}`}><button className='btn btn-outline' disabled={!nextPrevPattern || !nextPrevPattern.next}>Next</button></a>
                        {/* </Link> */}
                        {/* <button className='btn btn-outline' disabled={!nextPrevPattern || !nextPrevPattern.prev}>Prev</button>
                        <button className='btn btn-outline'>Next</button> */}
                    </div>
                    {/* <div className=' mb-4'>
                            <button onClick={toggleCode} className={`btn w-max ml-2 ${view === 'code' ? 'btn-primary' : 'btn-outline'}`}><BiCodeAlt className='text-xl mr-1' /> code</button>
                        </div> */}

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2   relative bg-neutral-focus h-full shadow-md shadow-primary/50 rounded-xl overflow-hidden pt-3">
                    <div className=" absolute -top-3 left-0 w-full">
                        <progress className="progress progress-primary w-full p-0" value={progress} max="100"></progress>
                    </div>
                    <div className="absolute right-0 bottom-0 px-5 py-2 backdrop-blur-sm  w-full max-w-md">
                        <div className="form-control w-full ">

                            <div className="flex items-center justify-end gap-2">
                                <input type="number" min={2} max={6} disabled={isRunnning} placeholder="Type here" className={`input input-sm input-bordered w-full max-w-md ${error ? 'input-error' : ''}`} value={inputValue} onChange={handleInputChange} />
                                <button className='btn btn-primary btn-sm' disabled={error || isRunnning ? true : false} onClick={generate}>Save</button>
                            </div>
                            <label className="label">
                                <span className="label-text-alt text-error">{error?.message}</span>
                            </label>
                        </div>
                    </div>
                    <div className="overflow-auto ">
                        <PatternVisualizer onComplete={handleOnComplete} onPlay={handleOnPlaying} data={historyArray} onUpdate={onUpdate} />
                    </div>
                    <div className="overflow-auto h-full">
                        <CodeViewer process={currentHistory || undefined} codeData={props.question.getCodeData()} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default QuestionLayout