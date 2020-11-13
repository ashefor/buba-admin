import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllWithdrawalsRoutingModule } from './all-withdrawals-routing.module';
import { AllWithdrawalsComponent } from './all-withdrawals.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [AllWithdrawalsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AllWithdrawalsRoutingModule
  ]
})
export class AllWithdrawalsModule { }
