import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'boilerplate-angular';

  isAuthenticated$: Subscription;

  isSignedIn = false;

  constructor(private auth: AuthService) {
    this.isAuthenticated$ = this.auth.userAuthenticated.subscribe({
      next: (value) => {
        this.isSignedIn = value;
      },
      error: () => {
        this.isSignedIn = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.isAuthenticated$.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
