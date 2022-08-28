import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading = false;

  constructor(private router: Router) {}

  goToLink(route: string) {
    this.router.navigateByUrl(route);
  }
}
