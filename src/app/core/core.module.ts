import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [AuthService],
  exports: [NavbarComponent]
})
export class CoreModule { }
