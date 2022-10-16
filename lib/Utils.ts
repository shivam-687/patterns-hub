export const getLesserOddNumbers = (num: number, from?: number) => {
    let numbers = [];
    let ind = from || 0
    for (let index = ind; index <= num; index++) {
        if (index % 2 != 0) numbers.push(index)
    }
    return numbers;
}

export const generateChars = (char: string, count: number) => {
    let str = '';
    for (let index = 0; index < Math.abs(count); index++) {
        str += char;
    }
    return str;
}

export function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
}

export function getMedian(input: number) {
    return Math.round(input/2);
}

export function checkIfOdd(input: number){
    return input%2 === 0;
}

export function genrateSpaces(count: number){
    return generateChars('_', count);
}
