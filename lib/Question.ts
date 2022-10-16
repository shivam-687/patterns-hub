export const Langs = {
    JAVASCRIPT: 'javascript',
    C_LANG: 'c'
}

export type ProcessHistory = {
    matrix: string[][];
    activeRow: number;
    stepNumber: number;
    dynamicValue?: {[key: string]: any}
}

export type CodeData = {
    codeTemplate: string,
    map: {[key: string]: number[]},
    lang: string
}

export interface QuestionError extends Error {

}


export abstract class Question{
    protected title: string;
    protected history: ProcessHistory[];
    public defaultInput: number;
    private newLineCharacter: string;
    private input: number;
    protected codeData?: CodeData[];
    
    constructor(input?: number){
        this.title = 'Question';
        this.history = [];
        this.newLineCharacter = '\n'
        this.defaultInput = 0;
        this.input = this.defaultInput;
    }

    addProcess(index: number, cell: string, stepNumber: number, dynamicValue?:{[key: string]: any}){
        if(this.history.length <= 0){
            const tempMat: string[][] = [];
            this.history.push({
                stepNumber,
                activeRow: 0,
                matrix: this.addCell(tempMat,cell),
                dynamicValue
            })
            return;
        }
        const lastHistory = JSON.parse(JSON.stringify(this.history[this.history.length-1]));
       
        this.history.push({
            stepNumber,
            activeRow: lastHistory.activeRow,
            matrix: this.addCell(lastHistory.matrix, cell),
            dynamicValue 
        })
    }

    changeRow(index: number, stepNumber: number, dynamicValue?: {[key: string]: any}){
        if(this.history.length <= 0){
            this.history.push({
                matrix: [[]],
                activeRow: 0,
                stepNumber,
                dynamicValue: {}
            })
            return;
        }
        const lastHistory = JSON.parse(JSON.stringify(this.history[this.history.length-1]));
        this.history.push({
            stepNumber,
            activeRow: lastHistory.activeRow + 1,
            matrix: this.addNewRow(lastHistory.matrix),
            dynamicValue: dynamicValue
        })
    }


    addCell(tempMat: string[][], cell: string){
        if(tempMat.length < 0){
            tempMat.push([cell]);
            return tempMat;
        }
        tempMat[tempMat.length-1].push(cell)
        return tempMat;
    }

    addNewRow(matrix: string[][]){
        const tempMatrix = [...matrix];
        tempMatrix.push([]);
        return tempMatrix;
    }

    resetProcessHistory(){
        this.history= [];
    }

    // createNewWithEmptyMatrix(step: number, index: )

    exec(){
        this.history = [];
        if(!this.validateInput(this.input)){
            this.algo(this.input);
            return this.history;
        }
        return [];
    }

    pattern(){
        const lastHistory = this.history[this.history.length - 1];
        return lastHistory.matrix;
    }

    patternString(newLineChracter?: string){
        let strResult = '';
        const pt = this.pattern();
        if(pt.length <= 0){
            return strResult;
        }
        pt.forEach(row => {
            row.forEach(cell => {
                strResult+=cell;
            })
            strResult+=newLineChracter||this.newLineCharacter
        })
        return strResult;
    }

    info(){
        return {
            title: this.title,
            default_input: this.defaultInput,
        }
    }

    setInput(input: number){
        this.input = input;
    }

    getCodeData(){
        return this.codeData;
    }

    

    abstract validateInput(input: number): undefined|QuestionError;

    abstract algo(input: number):void;
}