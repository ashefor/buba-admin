import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BidUploadComponent } from './bid-upload.component';


const routes: Routes = [
  {
    path: '',
    component: BidUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidUploadRoutingModule { }
