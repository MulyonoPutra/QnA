import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Questions, QuestionAnswer } from '../interface/questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Questions> {
    return this.http.get<Questions>('assets/question.json');
  }

  findAllQuestions(): Observable<QuestionAnswer[]> {
    return this.http
      .get<Questions>('assets/question.json')
      .pipe(map((data: Questions) => data.questions));
  }
}
