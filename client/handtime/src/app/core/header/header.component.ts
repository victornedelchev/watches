import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get currentUser(): IUser | null {
    return this.userService.currentUser;
  }

  constructor(private userService: UserService, private router: Router) {}

  logoutHandler(): void {
    this.userService.logOut();
    this.router.navigate(['/watches']);
  }
}
