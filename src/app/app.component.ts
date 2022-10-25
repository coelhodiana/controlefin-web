import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSigned = false;
  isAuthenticated: boolean;

  constructor(private router: Router, public auth: AuthService) {
    this.isAuthenticated = false;
  }


  public ngOnInit(): void {
    this.auth.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
    });
  }

  public signOut(): void {
    this.auth.signOut()
    .then(() => {
      this.router.navigate(['/']);
    });
  }
}
