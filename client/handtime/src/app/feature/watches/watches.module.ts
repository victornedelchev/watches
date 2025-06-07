import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchesRoutingModule } from './watches-routing-module';
import { WatchListItemComponent } from './watch-list-item/watch-list-item.component';
import { RouterModule } from '@angular/router';
import { WatchDetailsComponent } from './watch-details/watch-details.component';

@NgModule({
  declarations: [WatchListComponent, WatchListItemComponent, WatchDetailsComponent],
  imports: [CommonModule, RouterModule],
  exports: [WatchListComponent, WatchesRoutingModule],
})
export class WatchesModule {}
