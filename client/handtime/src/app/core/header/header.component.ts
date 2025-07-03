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
  currentUser: IUser | null = null;
  
  get isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  // get currentUser(): IUser | null {
  //   return this.userService.getCurrentUser();
  // }



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
