import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import PatternVisualizer, { UpdateResult } from './PatternVisualizer';
import { ProcessHistory, Question, QuestionError } from '../lib/Question';
import CodeViewer from './CodeViewer';


const QuestionLayout = (props: { question: Question }) => {
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
    }, [])

    useEffect(() => {
        if (!validateWithValidator(inputValue)) {
            setError(null);
            setInputData(parseInt(inputValue));
        }
    }, [inputValue])

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
        <div className='container px:1 md:px-10 mx-auto'>

            <div className="flex flex-col gap-5 h-[calc(100vh-100px)] overflow-hidden pb-10">
                <div className=" flex-grow-0 flex items-center justify-between">
                    <h1 className='text-2xl flex-grow mb-2'>{props.question.info().title || 'Question'}</h1>

                    <div className="form-control w-full max-w-xs md:max-w-lg">

                        <div className="flex items-center justify-end gap-5">
                            <input type="number" min={2} max={6} disabled={isRunnning} placeholder="Type here" className={`input input-bordered w-full max-w-[100px] ${error ? 'input-error' : ''}`} value={inputValue} onChange={handleInputChange} />
                            <button className='btn btn-primary' disabled={error || isRunnning ? true : false} onClick={generate}>Save</button>
                        </div>

                        <label className="label">
                            <span className="label-text-alt text-error">{error?.message}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    {/* <div className=' mb-4'>
                            <button onClick={toggleCode} className={`btn w-max ml-2 ${view === 'code' ? 'btn-primary' : 'btn-outline'}`}><BiCodeAlt className='text-xl mr-1' /> code</button>
                        </div> */}

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 relative bg-[#251B37] h-full shadow-md shadow-primary/50 rounded-xl overflow-hidden pt-5">
                    <div className=" absolute -top-3 left-0 w-full">
                        <progress className="progress progress-primary w-full p-0" value={progress} max="100"></progress>
                    </div>
                    {/* <div className="absolute right-0 bottom-0 p-5 backdrop-blur-sm bg-black">
                        <div className="flex items-center justify-end gap-5">
                            <input type="number" min={2} max={6} disabled={isRunnning} placeholder="Type here" className={`input input-bordered w-full max-w-[100px] ${error ? 'input-error' : ''}`} value={inputValue} onChange={handleInputChange} />
                            <button className='btn btn-primary' disabled={error || isRunnning ? true : false} onClick={generate}>Save</button>
                        </div>
                    </div> */}
                    <div className=" h-full text-white">
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