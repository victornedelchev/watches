import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent implements OnInit {
  latestWatchList: IWatch[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  faExclamationTriangle = faExclamationTriangle;

  constructor(
    private titleService: Title,
    private watchService: WatchService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('New Arrivals Page');
    this.watchService.loadLastWatchList$().subscribe({
      next: (data) => {
        this.latestWatchList = data;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.userService.logout$().subscribe(() => {
            this.router.navigate(['/user/login']);
          });
        }

        this.isLoading = false;
        this.errorMessage = err.error.message || 'Error loading watches';
        console.error('Error loading watches', err);
      }
    })
  }
}
