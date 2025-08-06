import { Component, Input, OnInit } from '@angular/core';

import { IWatch } from 'src/app/core/interfaces/watch';
import { LikeService } from 'src/app/core/like.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-watch-list-item',
  templateUrl: './watch-list-item.component.html',
  styleUrls: ['./watch-list-item.component.css'],
})
export class WatchListItemComponent implements OnInit {
  @Input() watch: IWatch | undefined;

  likeCount: number = 0;
  isLiked: boolean = false;
  likeId: string | null = null;
  currentUserId: string | null = null;

  get isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  constructor(private likeService: LikeService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.currentUserId = user?._id || null;
      this.loadLikes();
    })
  }

  loadLikes() {
    this.likeService.getAllLikes$(this.watch?._id || '').subscribe((likes) => {
      this.likeCount = likes.length;
      const userLike = likes.find(like => like._ownerId === this.currentUserId);
      this.isLiked = !!userLike;
      this.likeId = userLike?._id || null;
    })
  }

  toggleLike() {
    if (this.isLiked && this.likeId) {
      this.likeService.unlikeWatch$(this.likeId).subscribe(() => {
        this.loadLikes();
      })
    } else {
      this.likeService.likeWatch$(this.watch?._id || '').subscribe(() => {
        this.loadLikes();
      })
    }
  }
}
