import InputValidator from "../InputValidator";
import { Langs, Question, QuestionError } from "../Question";

export default class SqaureStar extends Question {

  constructor(input?: number) {
    super(input);
    this.title = 'Sqaure Star';
    this.defaultInput = 5;
    this.setInput(5);
    this.codeData = [
      {
        codeTemplate: codeStr,
        map: { '1': [4], '2': [5] },
        lang: Langs.JAVASCRIPT
      },
      {
        codeTemplate: c_str,
        map: { '1': [8], '2': [10] },
        lang: Langs.C_LANG
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
    // defining an empty string
    let string = "";
    for (let i = 0; i < n; i++) { // external loop
      this.changeRow(i, 1, JSON.parse(JSON.stringify(data)))
      for (let j = 0; j < n; j++) { // internal loop
        string += "*";
        data['j'] = j;
        data['i'] = i
        this.addProcess(i, '*', 2, JSON.parse(JSON.stringify(data)))
      }
      // newline after each row
      string += "\\n";
    }


  }

}

const codeStr = `
let n = {{n}}; // row or column count
// defining an empty string
let string = "";
for(let i = 0; {{i}} < {{n}}; i++) { // external loop
  for(let j = 0; {{j}} < {{n}}; j++) { // internal loop
    string += "*";
  }
  // newline after each row
  string += "\n";
}
// printing the string
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