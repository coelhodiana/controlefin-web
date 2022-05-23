import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastComponent } from '../../components/toast/toast.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
})
export class ToastModule {}
