import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAdminRoutingModule } from './view-admin-routing.module';
import { ViewAdminComponent } from './view-admin.component';
import { SharedModule } from '../../shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [ViewAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    InputSwitchModule,
    ViewAdminRoutingModule
  ]
})
export class ViewAdminModule { }
