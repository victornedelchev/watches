import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-delete-modal',
  templateUrl: './comment-delete-modal.component.html',
  styleUrls: ['./comment-delete-modal.component.css']
})
export class CommentDeleteModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
