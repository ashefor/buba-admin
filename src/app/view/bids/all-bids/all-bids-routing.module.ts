import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBidsComponent } from './all-bids.component';


const routes: Routes = [
  {
    path: '',
    component: AllBidsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllBidsRoutingModule { }
