import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidListsRoutingModule } from './bid-lists-routing.module';
import { BidListsComponent } from './bid-lists.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [BidListsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BidListsRoutingModule
  ]
})
export class BidListsModule { }
