import InputValidator from "../InputValidator";
import { Langs, Question, QuestionError } from "../Question";

export default class LeftTriangle extends Question {

    constructor(input?: number) {
        super(input);
        this.title = 'Left Triangle Pattern';
        this.defaultInput = 5;
        this.setInput(5);
        this.codeData = [
            {
                codeTemplate: codeStr,
                map: { '1': [3, 7], '2': [4, 5] },
                lang: Langs.JAVASCRIPT
            },

        ]
    }

    validateInput(input: number): QuestionError | undefined {
        const validate = new InputValidator(input).notNan().isBetween(1, 100).result();
        return validate ? { message: validate } as QuestionError : undefined;
    }
    algo(input: number): void {
        let n = input; // row or column count
        let data = {
            n,
            j: 0,
            i: 0,
        }
        let string = "";
        for (let i = 1; i <= n; i++) {
            data['i']=i;
            this.changeRow(i, 1, JSON.parse(JSON.stringify(data)))
            for (let j = 0; j < i; j++) {
                string += "*";
                data['j']=i;
                this.addProcess(i,'*', 2, JSON.parse(JSON.stringify(data)))
            }
            string += "\n";
        }
        console.log(string);

    }

}

const codeStr = `
let n = {{n}};
let string = "";
for (let i = 1; {{i}} <= {{n}}; i++) {  // i: {{i}}
  for (let j = 0; {{j}} < {{i}}; j++) { // j: {{j}}
    string += "*";
  }
  string += "\n";
}
console.log(string);
`;