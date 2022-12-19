import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isDark = false;

  isSigned = false;

  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, public auth: AuthService) {
    this.setCurrentThemeMode();
  }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(() => {
      this.auth.isAuthenticated().then((success: boolean) => {
        this.isAuthenticated.next(success);
      });
    });
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
