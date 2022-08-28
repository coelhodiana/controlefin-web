import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDark = false;

  isSigned = false;

  constructor(private router: Router, public auth: AuthService) {
    this.setCurrentThemeMode();
    this.isSignedIn();
    console.log(this.isSigned);

  }

  isSignedIn () {
    this.auth.isAuthenticated().subscribe({
      next: (response) => {
        this.isSigned = response;
      }
    })
  }

  setCurrentThemeMode() {
    if (!localStorage.getItem('isDark')) {
      localStorage.setItem('isDark', JSON.stringify(this.isDark));
    } else {
      this.isDark = JSON.parse(localStorage.getItem('isDark')!);
      this.isDark ? document.body.classList.add('dark') : '';
    }
  }

  switchTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark');
    localStorage.setItem('isDark', JSON.stringify(this.isDark));
  }

  public signOut(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

}
