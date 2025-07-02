import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/core/interfaces/user';
import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userWatchList: IWatch[] = [];
  isLoading:  boolean = true;

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(private titleService: Title, private userService: UserService, private watchService: WatchService ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Profile Page');

    this.watchService.loadWatchList$().subscribe({
      next: (data: IWatch[]) => {
        this.isLoading = false;
        this.userWatchList = data.filter(watch => watch._ownerId === this.currentUser._id);
      } 
    })
  }
}
