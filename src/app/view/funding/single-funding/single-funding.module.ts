import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleFundingRoutingModule } from './single-funding-routing.module';
import { SingleFundingComponent } from './single-funding.component';


@NgModule({
  declarations: [SingleFundingComponent],
  imports: [
    CommonModule,
    SingleFundingRoutingModule
  ]
})
export class SingleFundingModule { }
