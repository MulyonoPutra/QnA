import { AppState } from 'src/@core/state-management/app.state';

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

export interface DialogData {
	name: string;
}

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
	panelOpenState = false;
	data: any;
	questions: any;

	constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
		private store: Store<AppState>
	) {}

	ngOnInit() {
		this.data = this.store.select('questionStore');
		this.questions =
			this.data.actionsObserver._value.payload.answer.questions;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
