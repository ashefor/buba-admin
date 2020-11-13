import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllFundingRoutingModule } from './all-funding-routing.module';
import { AllFundingComponent } from './all-funding.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [AllFundingComponent],
  imports: [
    CommonModule,
    SharedModule,
    AllFundingRoutingModule
  ]
})
export class AllFundingModule { }
