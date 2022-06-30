import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  login(user: User) {
    this.userAuthenticated.next(true);
    localStorage.setItem("isSigned", "true");
    this.router.navigate(['/transacoes']);
  }

  logout() {
    this.userAuthenticated.next(false);
    localStorage.setItem("isSigned", "false");
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.userAuthenticated.value;
  }
}
