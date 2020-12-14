import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BidListsComponent } from './bid-lists.component';


const routes: Routes = [
  {
    path: '',
    component: BidListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidListsRoutingModule { }
