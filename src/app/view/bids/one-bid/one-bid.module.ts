import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneBidRoutingModule } from './one-bid-routing.module';
import { OneBidComponent } from './one-bid.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [OneBidComponent],
  imports: [
    CommonModule,
    SharedModule,
    OneBidRoutingModule
  ]
})
export class OneBidModule { }
