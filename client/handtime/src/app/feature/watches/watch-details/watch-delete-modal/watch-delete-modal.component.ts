import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './watch-delete-modal.component.html',
  styleUrls: ['./watch-delete-modal.component.css']
})
export class WatchDeleteModalComponent {
  @Input() watchName: string = '';
  @Input() watchModel: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
