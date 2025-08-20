import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser: IUser | null = null;
  get isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser$.subscribe(user => this.currentUser = user)
  }

  logoutHandler(): void {
    this.userService.logout$().subscribe({
      next: () => this.router.navigate(['/watches']),
      error: (err) => console.error(err),
    });
  }
}
