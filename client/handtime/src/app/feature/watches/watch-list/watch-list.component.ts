import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { IWatch } from 'src/app/core/interfaces/watch';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit {
  watchList: IWatch[] = [];
  latestWatchList: IWatch[] = [];
  isLoading: boolean = true;
  searchByWatchNameText: string = '';
  errorMessage: string = '';
  faExclamationTriangle = faExclamationTriangle

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
    private watchService: WatchService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Products Page');

    this.watchService.loadWatchList$().subscribe({
      next: (data: IWatch[]) => {
        this.watchList = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error loading watches';
        this.isLoading = false;
        console.error('Error loading watches', err);
      },
    });
  }
}
