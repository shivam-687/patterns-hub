import React,  { createContext } from "React";

export type QuestionSolutionContextProps = {
    matrix: string[][],
    activeRow: number;
    setActiveRow: (index: number) => void,
    addCell: (data: string) => Promise<void>;
    addRow: (cells: string[]) => void,
    emptyMatrix: () => void;
}

const QuestionSolutionContext = createContext<QuestionSolutionContextProps>({} as QuestionSolutionContextProps)

export default QuestionSolutionContext;