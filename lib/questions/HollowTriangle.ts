import InputValidator from "../InputValidator";
import { Langs, Question, QuestionError } from "../Question";

export default class HollowTriangle extends Question {

    constructor(input?: number) {
        super(input);
        this.title = 'Hollow Triangle Pattern';
        this.defaultInput = 5;
        this.setInput(5);
        this.codeData = [
            {
                codeTemplate: codeStr,
                map: { '1': [3, 8], '2': [5, 6] },
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
        for (let i = 0; i < n; i++) {
          // printing star
          for (let k = 0; k < n - i; k++) {
            string += "*";
          }
          string += "\n";
        }
        console.log(string);

    }

}

const codeStr = `
let n = {{n}};
let string = "";
for (let i = 0; {{i}} < {{n}}; i++) {  // i: {{i}}
  // printing star
  for (let k = 0; k < {{k}} - {{i}}; k++) { n: {{n}}
    string += "*";
  }
  string += "\n";
}
console.log(string);
`;