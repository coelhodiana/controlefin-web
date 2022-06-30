import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ToastModule } from './components/toast/toast.module';


@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    HttpClientModule
  ],
  declarations: [
  ],
  exports: [
    ToastModule
  ]
})
export class SharedModule { }
