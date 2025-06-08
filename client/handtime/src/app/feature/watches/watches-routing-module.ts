import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchDetailsComponent } from './watch-details/watch-details.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { AuthGuard } from 'src/app/core/guards/auth.guards';

const routes: Routes = [
  { path: 'watches', component: WatchListComponent },
  {
    path: 'watches/add',
    canActivate: [AuthGuard],
    component: AddWatchComponent,
  },
  { path: 'watches/:_id', component: WatchDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchesRoutingModule {}
