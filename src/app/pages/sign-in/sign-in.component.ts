import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth/auth.service';
import { IUser } from './../../core/services/auth/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.signForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    const user: IUser = {
      email: this.signForm.value.email,
      password: this.signForm.value.password,
      showPassword: false,
      name: '',
      code: ''
    }
    this.auth.signIn(user);
  }
}
