import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllWithdrawalsComponent } from './all-withdrawals.component';


const routes: Routes = [
  {
    path: '',
    component: AllWithdrawalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllWithdrawalsRoutingModule { }
