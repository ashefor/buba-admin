import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundingReportComponent } from './funding-report.component';


const routes: Routes = [
  {
    path: '',
    component: FundingReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingReportRoutingModule { }
