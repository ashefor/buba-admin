import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';

import { FundingReportRoutingModule } from './funding-report-routing.module';
import { FundingReportComponent } from './funding-report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FundingReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    FundingReportRoutingModule
  ],
  providers: [LowerCasePipe, TitleCasePipe, DatePipe, CurrencyPipe]
})
export class FundingReportModule { }
