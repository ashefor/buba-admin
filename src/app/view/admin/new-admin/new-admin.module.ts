import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAdminRoutingModule } from './new-admin-routing.module';
import { NewAdminComponent } from './new-admin.component';
import { SharedModule } from '../../shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [NewAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    InputSwitchModule,
    NewAdminRoutingModule
  ]
})
export class NewAdminModule { }
