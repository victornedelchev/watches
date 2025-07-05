import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { CommentService } from 'src/app/core/comment.service';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

import { IComment } from 'src/app/core/interfaces/comment';
import { IUser } from 'src/app/core/interfaces/user';
import { IWatch } from 'src/app/core/interfaces/watch';

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
  editingCommentId: string = '';
  editCommentText: string = '';
  isEditMode: boolean = false;

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
    this.loadWatchAndComments();
  }

  private loadWatchAndComments(): void {
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
    });
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

  startEditComment(comment: IComment): void {
    this.editingCommentId = comment._id;
    this.editCommentText = comment.comment;
    this.isEditMode = true;
  }

  cancelEditComment(): void {
    this.editingCommentId = '';
    this.editCommentText = '';
  }

  saveEditComment(commentId: string): void {
    this.errorMessage = '';
    const watchId = this.activatedRoute.snapshot.params['_id'];

    this.commentService.editCommentById$(watchId, commentId, this.editCommentText).subscribe({

      next: (updatedComment: IComment) => {
        const index = this.comments.findIndex(comment => comment._id === commentId);
        if (index !== -1) {
          const existingComment = this.comments[index];

          const updatedCommentData = {
            ...existingComment,
            comment: this.editCommentText,
            _updatedOn: Date.now(),
          };

          if (updatedComment.comment) {
            updatedCommentData.comment = updatedComment.comment;
          }
          if (updatedComment._updatedOn) {
            updatedCommentData._updatedOn = updatedComment._updatedOn;
          }

          this.comments[index] = updatedCommentData;
        }
        this.editingCommentId = '';
        this.editCommentText = '';
        this.isEditMode = false;

      },
      error: (err) => {
        this.errorMessage = err;
        this.isEditMode = false;
        console.error(err);
      }
    });
  }

  deleteComment(commentId: string): void {
    this.errorMessage = '';

    this.commentService.deleteCommentById$(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(comment => comment._id !== commentId);
      },
      error: (err) => {
        this.errorMessage = err;
        console.error(err);
      }
    });

    this.isModalOpen = false;
  }

  canEditComment(comment: IComment): boolean {
    return this.currentUser?._id === comment._ownerId;
  }

  canDeleteComment(comment: IComment): boolean {
    return this.currentUser?._id === comment._ownerId;
  }
}
