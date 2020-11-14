import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityReportRoutingModule } from './activity-report-routing.module';
import { ActivityReportComponent } from './activity-report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ActivityReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ActivityReportRoutingModule
  ]
})
export class ActivityReportModule { }
