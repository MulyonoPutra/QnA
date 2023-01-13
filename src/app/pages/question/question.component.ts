import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/@components/dialog/dialog.component';
import { QuestionAnswer } from 'src/@core/interface/questions';
import { QuestionsService } from 'src/@core/service/questions.service';
import { AppState } from 'src/@core/state-management/app.state';

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as QuestionActions from '../../../@core/state-management/actions/question.action';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionComponent implements OnInit, OnDestroy {
  protected questionForms!: FormGroup;
  protected questionsArray: QuestionAnswer[] = [];
  protected questionsDialogData: QuestionAnswer[] = [];
  protected subscription: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private store: Store<AppState>
  ) {
  }

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
          this.questionsArray.forEach((x: Partial<QuestionAnswer>) => {
            control.push(this.patchValues(x.question!, x.answer!, x.correctAnswer!));
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

  submit(value: string): void {
    this.store.dispatch(
      new QuestionActions.AddAnswer({
        answer: value,
      })
    );

    this.openDialog();
  }

  patchValues(question: string, answer: string, correctAnswer: string) {
    return this.fb.group({
      question: [question],
      answer: [answer, [Validators.required, Validators.minLength(5)]],
      correctAnswer: [correctAnswer]
    });
  }

  getControls() {
    return (this.questionForms.get('questions') as FormArray).controls;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.questionForms.reset();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((subs) => {
        subs.unsubscribe();
      });
    }
  }
}
