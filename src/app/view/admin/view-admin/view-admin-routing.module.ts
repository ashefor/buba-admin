import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAdminComponent } from './view-admin.component';


const routes: Routes = [
  {
    path: '',
    component: ViewAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAdminRoutingModule { }
