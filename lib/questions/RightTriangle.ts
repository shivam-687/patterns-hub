import InputValidator from "../InputValidator";
import { Langs, Question, QuestionError } from "../Question";

export default class RightTriangle extends Question {

    constructor(input?: number) {
        super(input);
        this.title = 'Right Triangle Pattern';
        this.defaultInput = 5;
        this.setInput(5);
        this.codeData = [
            {
                codeTemplate: codeStr,
                map: { '1': [3], '2': [5, 6], '3': [9, 10] },
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
            k: 0
        }
        let string = "";
        for (let i = 1; i <= n; i++) {
            data['i']=i;
            this.changeRow(i, 1, JSON.parse(JSON.stringify(data)))
            // printing spaces
            for (let j = 0; j < n - i; j++) {
                data['i']=i;
                data['j']=j;
                this.addProcess(j, '_', 2, JSON.parse(JSON.stringify(data)))
                string += " ";
            }
            // printing star
            for (let k = 0; k < i; k++) {
                data['i']=i;
                data['k']=k;
                string += "*";
                this.addProcess(k, '*', 3, JSON.parse(JSON.stringify(data)))
            }
            string += "\n";
        }
        console.log(string);

    }

}

const codeStr = `
let n = {{n}};
let string = "";
for (let i = 1; {{i}} <= {{n}}; i++) { // i: {{i}}
  // printing spaces
  for (let j = 0; {{j}} < {{n}} - {{i}}; j++) { // j: {{j}}
    string += " ";
  }
  // printing star
  for (let k = 0; {{k}} < {{i}}; k++) { // k:{{k}}
    string += "*";
  }
  string += "\n";
}
console.log(string);
`;

const c_str = `
#include <stdio.h>
#include<conio.h>
int main()
{
    int n; // n = {{n}}
    printf("Enter the number of rows");
    scanf("%d",&n);
    for(int i=0; {{i}} < {{n}}; i++)
    {
        for(int j=0; {{j}} < {{n}}; j++)
        {
        printf("*");
        }
    printf("\n");
    }
    return 0;
}
`;