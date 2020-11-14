import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllAdminRoutingModule } from './all-admin-routing.module';
import { AllAdminComponent } from './all-admin.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [AllAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    AllAdminRoutingModule
  ]
})
export class AllAdminModule { }
