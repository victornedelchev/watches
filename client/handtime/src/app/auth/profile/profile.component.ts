import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { IUser } from 'src/app/core/interfaces/user';
import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userWatchList: IWatch[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  faExclamationTriangle = faExclamationTriangle;
  intervalId: any;

  get currentUser(): IUser | null {
    return this.userService.getCurrentUser();
  }

  constructor(
    private titleService: Title,
    private userService: UserService,
    private watchService: WatchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Profile Page');

    this.watchService.loadWatchList$().subscribe({
      next: (data: IWatch[]) => {
        this.userWatchList = data.filter(watch => watch._ownerId === this.currentUser?._id);
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMessage = err.error.message;
          this.intervalId = setInterval(() => {
            this.userService.logout$().subscribe(() => {
              this.router.navigate(['/user/login']);
            })
          }, 2500);
        }

        this.isLoading = false;
        this.errorMessage = err.error.message || 'Error loading profile data';;
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
