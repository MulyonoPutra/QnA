import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
	declarations: [NavbarComponent, DialogComponent],
	imports: [CommonModule, MaterialModule, RouterModule],
	exports: [NavbarComponent, DialogComponent],
})
export class ComponentsModule {}
