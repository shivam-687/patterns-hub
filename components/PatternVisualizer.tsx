import React, { ChangeEvent, memo, useContext, useEffect, useState } from 'react'
import Row from './Row';
import { ProcessHistory } from '../lib/Question';
import { IoPlay, IoPause, IoPlayBack, IoPlaySkipBack, IoPlayForward, IoPlaySkipForward } from 'react-icons/io5'
import { MdOutlineWifiProtectedSetup, MdReplay } from 'react-icons/md'

export interface UpdateResult extends ProcessHistory {
    progress: number
}
export type PatternVisualizerProps = {
    data: ProcessHistory[];
    onUpdate: (updateResult: UpdateResult | null) => void,
    onComplete: (isComplete: boolean) => void;
    onPlay: (isPlaying: boolean) => void;
}
export type AdMatrix = {
    id: string,
    data: string,
    hidden: boolean
}
let count = 0;
const PatternVisualizer = (props: PatternVisualizerProps) => {
    const [matrix, setMatrix] = useState<string[][]>([])
    const [activeIndex, setActive] = useState<number>(-1)
    const [historyArray, setHistoryArray] = useState<ProcessHistory[]>([]);
    const [isPaused, setIsPaused] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false)
    const [progress, setProgress] = useState<number>(0);
    const [speed, setSpeed] = useState(1000);
    const [speed2, setSpeed2] = useState(25);

    useEffect(() => {
        const savedSpeed = localStorage.getItem('speed');
        setSpeed(savedSpeed ? parseInt(savedSpeed) : 1000);
        console.log("Svaed speed", savedSpeed)
    }, [])


    useEffect(() => {
        setHistoryArray([]);
        setMatrix([])
        setHistoryArray(props.data);
        setIsPaused(false);
        count = 0;
    }, [props.data])

    useEffect(() => {
        let interval: any = null;
        if (isPaused === false) {
            interval = setInterval(() => {
                if (count >= historyArray.length) {
                    clearInterval(interval);
                    complete();
                    return;
                }
                update(count);
                count++
            }, speed);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };

    }, [historyArray, isPaused, speed])

    const update = async (index: number) => {
        const hist = historyArray[index];
        if (hist) {
            const cur_progress = Math.floor(((index + 1) / historyArray.length) * 100);
            setMatrix(prev => hist.matrix);
            setActive(hist.activeRow);
            setProgress(cur_progress);
            props.onUpdate({ ...hist, progress: cur_progress });
        }
    }

    const complete = () => {
        count = 0;
        setIsPaused(true)
        setIsCompleted(true)
        setActive(-1);
        props.onUpdate(null);
    }

    const prev = () => {
        if (count <= 0) {
            return;
        }
        setIsPaused(true);
        count--;
        if (count > historyArray.length - 1) {
            prev();
        }
        update(count);
    }

    const next = () => {
        if (count >= historyArray.length - 1) {
            // console.log("Next: ", count)
            return;
        }
        setIsPaused(true);
        count++;
        update(count);
    }

    const togglePause = () => {
        setIsPaused(prev => !prev)
        if (isCompleted) {
            setProgress(0);
            setIsCompleted(false)
        }
    }

    useEffect(() => {
        props.onComplete(isCompleted);
    }, [complete])

    useEffect(() => {
        props.onPlay(!isPaused)
    }, [isPaused])
    // useEffect(() => {
    //     localStorage.setItem('speed', speed+'')
    //     console.log("Sve speed", speed);
    // }, [speed])

    const handleSpeedChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setSpeed(parseInt(ev.target.value));
        localStorage.setItem('speed', ev.target.value + '')
    }


    return (
        <div className=" w-full h-full relative flex flex-col">
            
            
            <div className=" flex-grow overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-focus pb-5">
                <div className='w-max h-max'>
                    {
                        matrix.map((d, index) => {
                            return <Row data={d} key={index} isActive={activeIndex === index} />
                        })
                    }
                </div>
            </div>

            <div className='flex-grow-0'>
                <div className="flex items-center gap-5 px-5 mb-5">
                    <button onClick={prev} className='btn btn-sm btn-outline btn-primary text-xl md:text-xl' disabled={count === 0}><IoPlayBack /></button>
                    <button onClick={togglePause} className='btn btn-sm btn-outline btn-primary text-xl md:text-xl'>{isPaused ? isCompleted ? <MdReplay /> : <IoPlay /> : <IoPause />}</button>
                    <button onClick={next} className='btn btn-sm btn-outline btn-primary text-xl md:text-xl' disabled={isCompleted || count > historyArray.length - 1}><IoPlayForward /></button>
                 
                    <div className="max-w-md">
                    <input type="range" min="10" max="1010" value={speed} className={`range range-xs ${isPaused && 'range-primary'}`} step="200" onChange={handleSpeedChange} disabled={!isPaused} />
                    </div>
                
                </div>
            </div>
            
        </div>
    )
}

export default PatternVisualizer