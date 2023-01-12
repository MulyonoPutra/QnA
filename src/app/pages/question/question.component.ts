import { Subscription } from 'rxjs';
import { QuestionAnswer } from 'src/@core/interface/questions';
import { QuestionsService } from 'src/@core/service/questions.service';

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionComponent implements OnInit, OnDestroy {
  questionForms!: FormGroup;
  questionsArray: QuestionAnswer[] = [];
  public subscription: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.findAllQuestions();
    this.initForms();
  }

  findAllQuestions(): void {
    this.subscription.push(
      this.questionService.findAllQuestions().subscribe({
        next: (response) => {
          this.questionsArray = response;
          const control = <FormArray>this.questionForms.get('questions');
          this.questionsArray.forEach((x: QuestionAnswer) => {
            control.push(this.patchValues(x.question, x.answer));
          });
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }

  initForms(): void {
    this.questionForms = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  submit(value: any): void {
    console.log(value);
  }

  patchValues(question: string, answer: string) {
    return this.fb.group({
      question: [question],
      answer: [answer],
    });
  }

  getControls() {
    return (this.questionForms.get('questions') as FormArray).controls;
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
        this.subscription.forEach((subs) => {
            subs.unsubscribe();
        });
    }
}
}
