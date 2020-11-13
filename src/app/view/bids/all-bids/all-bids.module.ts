import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBidsRoutingModule } from './all-bids-routing.module';
import { AllBidsComponent } from './all-bids.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [AllBidsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AllBidsRoutingModule
  ]
})
export class AllBidsModule { }
