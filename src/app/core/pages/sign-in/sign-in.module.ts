import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in.component';
import { SignInRoutes } from './sign-in.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignInRoutes
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }
