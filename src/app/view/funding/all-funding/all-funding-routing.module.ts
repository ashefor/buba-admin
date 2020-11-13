import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFundingComponent } from './all-funding.component';


const routes: Routes = [
  {
    path: '',
    component: AllFundingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllFundingRoutingModule { }
