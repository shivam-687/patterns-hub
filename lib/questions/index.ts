import { Question } from "../Question";
import Question1 from "./Question1";
import SqaureStar from "./SquareStar";

export type Pattern = {
    pattern: Question,
    meta: {
        title: string,
        desc?: string,
        thumbnail?: string
    }
}
export  const Q1 = new Question1();

export const Patterns: Pattern[] = [
    {
        pattern: new SqaureStar(),
        meta: {
            title: 'Square Star Pattern',
            thumbnail: '/assets/images/patterns/square-star.jpg'
        }
    },
    {
        pattern: new Question1,
        meta: {
            title: 'Hollow Square Star Pattern',
            thumbnail: '/assets/images/patterns/hollow-square.jpg'
        }
    },
    {
        pattern: new Question1,
        meta: {
            title: 'Right Triangle Pattern',
            thumbnail: '/assets/images/patterns/right-triangle.jpg'
        }
    },
    {
        pattern: new Question1,
        meta: {
            title: 'Square Star Pattern',
            thumbnail: '/assets/images/patterns/pyramid-star.jpg'
        }
    },
    {
        pattern: new Question1,
        meta: {
            title: 'Square Star Pattern',
            thumbnail: '/assets/images/patterns/pyramid-star.jpg'
        }
    },
    {
        pattern: new Question1,
        meta: {
            title: 'Square Star Pattern',
            thumbnail: '/assets/images/patterns/pyramid-star.jpg'
        }
    },
]

// export function getPattern(index: number){
//     return Pattern[index]
// }