import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundingReportRoutingModule } from './funding-report-routing.module';
import { FundingReportComponent } from './funding-report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FundingReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    FundingReportRoutingModule
  ]
})
export class FundingReportModule { }
