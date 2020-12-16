import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CustomeDatePipe } from 'src/app/core/pipes/custome-date.pipe';


@NgModule({
  declarations: [DashboardComponent,
    CustomeDatePipe,],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
