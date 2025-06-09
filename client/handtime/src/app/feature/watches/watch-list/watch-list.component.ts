import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IWatch } from 'src/app/core/interfaces/watch';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit {
  watchList: IWatch[] = [];

  constructor(
    private titleService: Title,
    private watchService: WatchService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Products Page');

    this.watchService.loadWatchList$().subscribe({
      next: (data: IWatch[]) => {
        this.watchList = data;
      },
      error: (err) => {
        console.error('Error loading watches', err);
      },
    });
  }
}
