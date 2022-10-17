import { Question } from "../Question";
import HollowStar from "./HollowStar";
import LeftTriangle from "./LeftTriangle";
import Question1 from "./Question1";
import RightTriangle from "./RightTriangle";
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
        pattern: new HollowStar(),
        meta: {
            title: 'Hollow Square Star Pattern',
            thumbnail: '/assets/images/patterns/hollow-square.jpg'
        }
    },
    {
        pattern: new RightTriangle,
        meta: {
            title: 'Right Triangle Pattern',
            thumbnail: '/assets/images/patterns/right-triangle.jpg'
        }
    },
    {
        pattern: new LeftTriangle,
        meta: {
            title: 'Left Traingle Pattern',
            thumbnail: '/assets/images/patterns/left-triangle.jpg'
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

export function getNextAndPrev(index: number): {next: string|undefined, prev: string|undefined}{
    const obj: {next: string|undefined, prev: string|undefined} = {
        next: undefined,
        prev: undefined
    }
    if(index > Patterns.length || index < 0) return obj;

    obj['next'] = index === Patterns.length - 1 ? undefined : `${index+1}`;
    obj['prev'] = index === 1 ? undefined : `${index-1}`;

    return obj;
}