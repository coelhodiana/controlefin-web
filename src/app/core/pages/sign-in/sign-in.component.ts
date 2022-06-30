import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.signForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    this.auth.login(this.signForm.value);
  }
}
