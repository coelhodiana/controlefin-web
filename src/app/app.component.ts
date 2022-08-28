import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSigned = false;

  constructor(private router: Router, public auth: AuthService) {}

  isSignedIn() {
    this.auth.isAuthenticated().subscribe({
      next: (res) => {
        this.isSigned = res
      }
    })
  }
}
