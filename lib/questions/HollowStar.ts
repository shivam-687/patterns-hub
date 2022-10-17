import InputValidator from "../InputValidator";
import { Langs, Question, QuestionError } from "../Question";

export default class HollowStar extends Question {

  constructor(input?: number) {
    super(input);
    this.title = 'Hollow Star';
    this.defaultInput = 5;
    this.setInput(5);
    this.codeData = [
      {
        codeTemplate: codeStr,
        map: { '1': [5], '2': [6, 7, 8], '3': [6, 10, 11, 12], '4': [6, 14, 15] },
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
      c1: false,
      c2: false,
      c3: false
    }
    // defining an empty string
    let string = "";

    for (let i = 0; i < n; i++) { // external loop
      data['i'] = i;
      this.changeRow(i, 1, JSON.parse(JSON.stringify(data)))
      for (let j = 0; j < n; j++) { // internal loop
        if (i === 0 || i === n - 1) {
          string += "*";
          data['i'] = i;
          data['j'] = j;
          data['c1'] = true
          this.addProcess(j, '*', 2, JSON.parse(JSON.stringify(data)))
        }
        else {
          if (j === 0 || j === n - 1) {
            string += "*";
            data['i'] = i;
            data['j'] = j;
            data['c1'] = false;
            data['c2'] = true;
            this.addProcess(j, '*', 3, JSON.parse(JSON.stringify(data)))
          }
          else {
            string += " ";
            data['i'] = i;
            data['j'] = j;
            data['c1'] = false;
            data['c2'] = false;
            data['c3'] = true
            this.addProcess(j, '_', 4, JSON.parse(JSON.stringify(data)))
          }
        }
      }
      // newline after each row
      string += "\n";
    }

  }

}

const codeStr = `
let n = {{n}}; // row or column count
// defining an empty string
let string = "";

for(let i = 0; {{i}} < {{n}}; i++) { // external loop
  for(let j = 0; {{j}} < {{n}}; j++) { // internal loop
    if({{i}} === 0 || {{i}} === {{n}} - 1) { // {{c1}}
      string += "*";
    }
    else {
      if({{j}} === 0 || {{j}} === {{n}} - 1) { // {{c2}}
        string += "*";
      }
      else {
        string += " ";
      }
    }
  }
  // newline after each row
  string += "\\n";
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