import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OneBidComponent } from './one-bid.component';


const routes: Routes = [
  {
    path: '',
    component: OneBidComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneBidRoutingModule { }
