import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user';

import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrls: ['./watch-details.component.css'],
})
export class WatchDetailsComponent implements OnInit {
  watch!: IWatch;
  currentUser: IUser = this.userService.currentUser;

  

  constructor(
    private titleService: Title,
    private watchService: WatchService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Watch Details Page');

    const watchId = this.activatedRoute.snapshot.params['_id'];

    this.watchService.loadWatchById$(watchId).subscribe({
      next: (data: IWatch) => {
        this.watch = data;
      },
      error: (err) => {
        console.error('Error loading watch', err);
      },
    });
  }
}
