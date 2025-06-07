import { Component, Input } from '@angular/core';
import { IWatch } from 'src/app/core/interfaces/watch';

@Component({
  selector: 'app-watch-list-item',
  templateUrl: './watch-list-item.component.html',
  styleUrls: ['./watch-list-item.component.css'],
})
export class WatchListItemComponent {
  @Input() watch: IWatch | undefined;
}
