import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthService } from './services/auth/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthService]
})
export class CoreModule { }
