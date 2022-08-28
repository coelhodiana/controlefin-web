import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, IUser } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  confirmForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  user: IUser = {} as IUser;
  isConfirm = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.confirmForm = this.fb.group({
      code: [''],
    });
  }

  ngOnInit(): void {
    console.log('alo');
  }

  public signUp(user: any): void {
    this.user = {
      email: user.value.email,
      password: user.value.password,
      showPassword: false,
      code: '',
      name: '',
    };

    this.isConfirm = true;
    this.auth.signUp(this.user);
  }

  public confirmSignUp(): void {
    this.user = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      showPassword: false,
      code: this.confirmForm.value.code,
      name: '',
    };
    console.log(this.user);

    this.auth
      .confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/entrar']);
      })
      .catch(() => {
        console.log('erro');
      });
  }
}
