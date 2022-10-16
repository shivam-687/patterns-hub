import InputValidator from "../InputValidator";
import { Question, QuestionError } from "../Question";

export default class Question1 extends Question {

    constructor(input?: number){
        super(input);
        this.title = 'Question 1';
        this.defaultInput = 5;
        this.setInput(5);
        this.codeData = {
            codeTemplate: codeStr,
            map: {'1': [3], '2': [5,], '3': [9]}
        }
    }

    validateInput(input: number): QuestionError | undefined {
        const validate = new InputValidator(input).notNan().isBetween(1, 100).result();
        return validate ? {message: validate} as QuestionError: undefined;
    }
    algo(input: number): void {
        let n = input;
        let string = "";
        let data: any = {
            input,
            n
        }
        for (let i = 1; i <= n; i++) {
            this.changeRow(i, 1);
            // printing spaces
            for (let j = 0; j < n - i; j++) {
                string += " ";
                data['i']=i,
                data['j']=j,
                this.addProcess(i, '_', 2, data)
            }
            // printing star
            for (let k = 0; k < i; k++) {
                string += "*";
                data['k']=k,
                data['i']=i
                this.addProcess(i, '*', 3, data)

            }
            string += "\n";
        }
    }

}

const codeStr = `
let n = {{input}};
let str = "";
for (let i = 1; {{i}} <= {{n}}; i++) {
    // printing spaces
    for (let j = 0; {{j}} < {{n}} - {{i}}; j++) {
        str += " ";
    }
    // printing star
    for (let k = 0; k < {{i}}; k++) {
        str += "*";
    }
    str += "\\n";
}

`