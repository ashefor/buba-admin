import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevenueReportsComponent } from './revenue-reports.component';


const routes: Routes = [
  {
    path: '',
    component: RevenueReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenueReportRoutingModule { }
