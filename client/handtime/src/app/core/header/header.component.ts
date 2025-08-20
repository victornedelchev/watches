import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  currentUser: IUser | null = null;
  logoutSub!: Subscription;

  get isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser$.subscribe(user => this.currentUser = user)
  }

  logoutHandler(): void {
    this.logoutSub = this.userService.logout$().subscribe({
      next: () => this.router.navigate(['/watches']),
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.logoutSub.unsubscribe();
  }
}
