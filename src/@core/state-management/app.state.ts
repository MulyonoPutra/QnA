import { QuestionAnswer } from 'src/@core/interface/questions';

export interface AppState {
  readonly questionStore: QuestionAnswer[];
}
