import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchesRoutingModule } from './watches-routing-module';

@NgModule({
  declarations: [WatchListComponent],
  imports: [CommonModule],
  exports: [WatchListComponent, WatchesRoutingModule],
})
export class WatchesModule {}
