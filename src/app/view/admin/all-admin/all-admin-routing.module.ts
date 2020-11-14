import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllAdminComponent } from './all-admin.component';


const routes: Routes = [
  {
    path: '',
    component: AllAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllAdminRoutingModule { }
