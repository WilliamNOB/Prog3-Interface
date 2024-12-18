import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpentsRoutingModule } from './spents-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    SpentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SpentsModule { }
