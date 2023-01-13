import { QuestionAnswer } from 'src/@core/interface/questions';

import { Action } from '@ngrx/store';

export const ADD_ANSWER = 'Add Answer';
export const GET_QUESTIONS = 'GET Questions';

export class AddAnswer implements Action {
	readonly type = ADD_ANSWER;

	constructor(public payload: QuestionAnswer) {}
}

export class GetQuestions implements Action {
	readonly type = GET_QUESTIONS;

	constructor(public payload: QuestionAnswer) {}
}

export type Actions = AddAnswer | GetQuestions;
