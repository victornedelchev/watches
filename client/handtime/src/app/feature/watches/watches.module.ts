import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchesRoutingModule } from './watches-routing.module';
import { WatchListItemComponent } from './watch-list-item/watch-list-item.component';
import { WatchDetailsComponent } from './watch-details/watch-details.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    WatchListComponent,
    WatchListItemComponent,
    WatchDetailsComponent,
    AddWatchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [WatchListComponent, WatchesRoutingModule],
})
export class WatchesModule {}
