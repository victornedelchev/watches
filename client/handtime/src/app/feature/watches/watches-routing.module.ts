import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchDetailsComponent } from './watch-details/watch-details.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { AuthGuard } from 'src/app/core/guards/auth.guards';
import { EditWatchComponent } from './edit-watch/edit-watch.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WatchListComponent },
  {
    path: 'add',
    component: AddWatchComponent,
    canActivate: [AuthGuard],
  },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: ':_id', component: WatchDetailsComponent },
  {
    path: ':_id/edit',
    component: EditWatchComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchesRoutingModule { }
