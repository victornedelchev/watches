import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit, OnDestroy {
  watchList: IWatch[] = [];
  latestWatchList: IWatch[] = [];
  isLoading: boolean = true;
  searchByWatchNameText: string = '';
  errorMessage: string = '';
  private intervalId: any;
  faExclamationTriangle = faExclamationTriangle;

  onSearchInput(searchValue: string): void {
    this.searchByWatchNameText = searchValue;
  }

  get filteredWatchList(): IWatch[] {
    if (!this.searchByWatchNameText.trim()) {
      return this.watchList;
    }

    return this.watchList.filter(watch =>
      watch.brand.toLowerCase().includes(this.searchByWatchNameText.toLowerCase())
    );
  }

  constructor(
    private titleService: Title,
    private watchService: WatchService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Products Page');

    this.watchService.loadWatchList$().subscribe({
      next: (data: IWatch[]) => {
        this.watchList = data;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMessage = err.error.message || 'Error loading watches';
          this.intervalId = setInterval(() => {
            this.userService.logout$().subscribe(() => {
              this.router.navigate(['/user/login']);
            });
          }, 2500);

        }

        this.errorMessage = err.error.message || 'Error loading watches';
        this.isLoading = false;
        console.error('Error loading watches', err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
