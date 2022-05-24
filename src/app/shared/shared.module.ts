import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastModule } from './components/toast/toast.module';


@NgModule({
  imports: [
    CommonModule,
    ToastModule
  ],
  declarations: [
  ],
  exports: [
    ToastModule
  ]
})
export class SharedModule { }
