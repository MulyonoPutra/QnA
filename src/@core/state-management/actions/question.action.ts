import { QuestionAnswer } from 'src/@core/interface/questions';

import { Action } from '@ngrx/store';

export const ADD_ANSWER = 'Add Answer';

export class AddAnswer implements Action {
    readonly type = ADD_ANSWER;

    constructor(public payload: QuestionAnswer) {}
}

export type Actions = AddAnswer
