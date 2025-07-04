import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWatch } from 'src/app/core/interfaces/watch';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  @Input() watch: IWatch | null = null;
  @Output() save = new EventEmitter<IWatch>();
  @Output() close = new EventEmitter<void>();

  onSave() {
    if (this.watch) {
      this.save.emit(this.watch);
    }
  }

  onClose() {
    this.close.emit();
  }
}
