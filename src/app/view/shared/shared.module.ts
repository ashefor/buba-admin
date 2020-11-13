import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterModule } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    PanelModule,
    ToggleButtonModule,
    DropdownModule,
    DialogModule,
    ProgressBarModule,
    InputNumberModule,
    KeyFilterModule,
    InputTextModule,
    SidebarModule,
    RouterModule
  ],
  exports: [
    ButtonModule,
    InputNumberModule,
    ProgressBarModule,
    PanelModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    DialogModule,
    TableModule,
    FormsModule,
    KeyFilterModule,
    InputTextModule,
    SidebarModule,
    RouterModule
  ]
})
export class SharedModule { }
