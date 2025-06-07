import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchesRoutingModule } from './watches-routing-module';
import { WatchListItemComponent } from './watch-list-item/watch-list-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WatchListComponent, WatchListItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [WatchListComponent, WatchesRoutingModule],
})
export class WatchesModule {}
