import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZeroFundingComponent } from './zero-funding.component';


const routes: Routes = [
  {
    path: '',
    component: ZeroFundingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZeroFundingRoutingModule { }
