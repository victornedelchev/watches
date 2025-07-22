import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-watch-search',
  templateUrl: './watch-search.component.html',
  styleUrls: ['./watch-search.component.css']
})
export class WatchSearchComponent {
  @Output()
  searchBrandTextChange: EventEmitter<string> = new EventEmitter<string>();

  searchByWatchBrand: string = '';

  onSearchTextChange(): void {
    this.searchBrandTextChange.emit(this.searchByWatchBrand.trim());
  }
}
