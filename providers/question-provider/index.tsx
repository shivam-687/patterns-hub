import  QuestionSolutionContext  from './QuestionSolutionContext';
import { PropsWithChildren, useState } from 'react';
import { sleep } from '../../lib/Utils';


const QuestionSolutionProvider = (props: PropsWithChildren<{}>) => {

    const [matrix, setMatrix] = useState<string[][]>([]);
    const [activeRow, setActiveRow] = useState<number>(-1);

    const addCell = async (char: string) => {
        let temp = matrix;
        if(temp.length <= 0){
            temp.push([char])
            setMatrix(temp);
            return;
        }
        const temprow = temp[temp.length-1];
        temprow.push(char);
        temp[temp.length-1] = temprow;
        setMatrix(temp)
        // console.log("AddCell: ",matrix, char)
        await sleep(1000);
    }

    const addRow = (cells: string[]) => {
        const temp = matrix;
        temp.push(cells)
        setMatrix(temp)
    }

    const emptyMatrix = async() => {
        setMatrix([]);
        await sleep(100);
    }

    return <QuestionSolutionContext.Provider value = {{
        matrix,
        activeRow,
        setActiveRow,
        addCell,
        addRow,
        emptyMatrix
    }}>{props.children}</QuestionSolutionContext.Provider>
}

export default QuestionSolutionProvider;