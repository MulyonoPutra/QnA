

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../@core/state-management/app.state';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  data: any;
  questionsData: any;
  panelOpenState = false;
  constructor(private router: Router, private store: Store<AppState>) {
    this.data = this.store.select('questionStore');
    this.questionsData = this.data.actionsObserver._value.payload.answer.questions
  }


  ngOnInit(): void {
    console.log(this.data.actionsObserver._value.payload.answer.questions);

  }

  navigate() {
    this.router.navigateByUrl('/question');
  }
}
