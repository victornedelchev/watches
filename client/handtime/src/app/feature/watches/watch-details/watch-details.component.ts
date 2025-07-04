import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/core/comment.service';
import { IComment } from 'src/app/core/interfaces/comment';
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
  currentUser: IUser | null = this.userService.getCurrentUser();
  isLoading: boolean = true;
  errorMessage: string = '';
  comments: IComment[] = [];
  isOwner: boolean = false;
  isModalOpen: boolean = false;

  constructor(
    private titleService: Title,
    private watchService: WatchService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private commentService: CommentService,
    private router: Router,
  ) { }

  get isLoggedIn(): boolean {
    return !!this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Watch Details Page');

    const watchId = this.activatedRoute.snapshot.params['_id'];

    this.watchService.loadWatchById$(watchId).subscribe({
      next: (data: IWatch) => {
        this.isLoading = false;
        this.watch = data;
        this.isOwner = this.currentUser?._id === this.watch._ownerId;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading watch', err);
      },
    });

    this.commentService.getAllComments$(watchId).subscribe({
      next: (data: IComment[]) => {
        this.isLoading = false;
        this.comments = data;
      },
      error: (err) => {
        this.errorMessage = err;
        console.error(err);
      }
    })
  }

  openDeleteModal(): void {
    this.isModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isModalOpen = false;
  }

  confirmDeleteWatch(): void {
    const watchId = this.activatedRoute.snapshot.params['_id'];

    this.watchService.deleteWatchById$(watchId).subscribe({
      next: () => this.router.navigate(['/watches']),
      error: (err) => console.error(err),
    })

    this.isModalOpen = false;
  }

  addComment(addCommentForm: NgForm) {
    this.errorMessage = '';

    const watchId = this.activatedRoute.snapshot.params['_id'];

    this.commentService.createComment$(watchId, addCommentForm.value.comment).subscribe({
      next: (createdComment: IComment) => {
        createdComment.author = {
          _id: this.currentUser!._id,
          username: this.currentUser!.username
        }
        this.comments.unshift(createdComment);
        addCommentForm.reset();
      },
      error: (err) => {
        this.errorMessage = err;
        console.error(err);
      }
    })
  }
}
