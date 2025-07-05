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
import { EditWatchComponent } from './edit-watch/edit-watch.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { EditModalComponent } from './edit-watch/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './watch-details/delete-modal/delete-modal.component';
import { CommentDeleteModalComponent } from './watch-details/comment-delete-modal/comment-delete-modal.component';

@NgModule({
  declarations: [
    WatchListComponent,
    WatchListItemComponent,
    WatchDetailsComponent,
    AddWatchComponent,
    EditWatchComponent,
    NewArrivalsComponent,
    EditModalComponent,
    DeleteModalComponent,
    CommentDeleteModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [WatchListComponent, WatchesRoutingModule, WatchListItemComponent],
})
export class WatchesModule { }
