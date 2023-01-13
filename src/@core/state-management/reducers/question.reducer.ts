import { QuestionAnswer } from 'src/@core/interface/questions';

import { Action } from '@ngrx/store';

import * as QuestionActions from '../actions/question.action';

export function questionReducer(state: QuestionAnswer[] = [], action: Action) {
	switch (action.type) {
		case QuestionActions.ADD_ANSWER:
			return [...state, (action as QuestionActions.Actions).payload];

		case QuestionActions.GET_QUESTIONS:
			return [...state, (action as QuestionActions.GetQuestions).payload];
		default:
			return state;
	}
}
