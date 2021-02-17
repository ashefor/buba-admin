import { NgModule } from '@angular/core';
import { CommonModule, LowerCasePipe, TitleCasePipe } from '@angular/common';

import { ZeroFundingRoutingModule } from './zero-funding-routing.module';
import { ZeroFundingComponent } from './zero-funding.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ZeroFundingComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ZeroFundingRoutingModule
  ],
  providers: [LowerCasePipe, TitleCasePipe]
})
export class ZeroFundingModule { }
