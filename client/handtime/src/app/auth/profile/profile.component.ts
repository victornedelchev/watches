import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(private titleService: Title, private userService: UserService) {}

  ngOnInit(): void {
    this.titleService.setTitle('Profile Page');
  }
}
