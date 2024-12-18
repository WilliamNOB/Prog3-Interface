import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationsRoutingModule } from './operations-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OperationsModule { }
