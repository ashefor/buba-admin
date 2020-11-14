import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersReportRoutingModule
  ]
})
export class UsersReportModule { }
