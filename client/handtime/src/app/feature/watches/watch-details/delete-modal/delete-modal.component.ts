import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
 @Input() watchName: string = '';
 @Input() watchModel: string = '';
 @Output() confirm = new EventEmitter<void>();
 @Output() cancel = new EventEmitter<void>();
}
