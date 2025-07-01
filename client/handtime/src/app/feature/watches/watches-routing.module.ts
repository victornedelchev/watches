import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchDetailsComponent } from './watch-details/watch-details.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { AuthGuard } from 'src/app/core/guards/auth.guards';
import { EditWatchComponent } from './edit-watch/edit-watch.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WatchListComponent },
  {
    path: 'add',
    canActivate: [AuthGuard],
    component: AddWatchComponent,
  },
  { path: ':_id', component: WatchDetailsComponent },
  {path: ':_id/edit', component: EditWatchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchesRoutingModule {}
