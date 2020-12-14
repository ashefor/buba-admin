import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidUploadRoutingModule } from './bid-upload-routing.module';
import { BidUploadComponent } from './bid-upload.component';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [BidUploadComponent],
  imports: [
    CommonModule,
    DialogModule,
    BidUploadRoutingModule
  ]
})
export class BidUploadModule { }
