import { QuestionAnswer } from 'src/@core/interface/questions';

import { Action } from '@ngrx/store';

import * as QuestionActions from '../actions/question.action';

const initialState: QuestionAnswer = {
  question: '',
  answer: '',
  correctAnswer: ''
}

export function questionReducer(state: QuestionAnswer[] = [], action: Action) {
  switch(action.type) {
      case QuestionActions.ADD_ANSWER:
          return [...state, (action as QuestionActions.Actions).payload];
      default:
          return state;
  }
}
