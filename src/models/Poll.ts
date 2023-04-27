import { Question } from "./Question";

export interface Poll {
    id?: string,
    title: string,
    questions: Question[],
    status: string
}
