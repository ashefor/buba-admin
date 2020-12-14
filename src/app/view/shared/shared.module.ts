import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    PanelModule,
    InputTextareaModule,
    DropdownModule,
    DialogModule,
    TabViewModule,
    InputNumberModule,
    InputTextModule,
    SidebarModule,
    RouterModule
  ],
  exports: [
    ButtonModule,
    InputNumberModule,
    PanelModule,
    InputTextareaModule,
    ReactiveFormsModule,
    TabViewModule,
    DropdownModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    SidebarModule,
    RouterModule
  ]
})
export class SharedModule { }
