import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IWatch } from 'src/app/core/interfaces/watch';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent implements OnInit {
  isLoading: boolean = true;
  latestWatchList: IWatch[] = [];
  constructor(private titleService: Title, private watchService: WatchService) { }

  ngOnInit(): void {
    this.titleService.setTitle('New Arrivals Page');
    this.watchService.loadLastWatchList$().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.latestWatchList = data;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    })
  }
}
