import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { RevenueReportsComponent } from './revenue-reports.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RevenueReportRoutingModule } from './revenue-report-routing.module';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [RevenueReportsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    RevenueReportRoutingModule
  ],
  providers: [LowerCasePipe, TitleCasePipe, DatePipe, CurrencyPipe]
})
export class RevenueReportsModule { }
