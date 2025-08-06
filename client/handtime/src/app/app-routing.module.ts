import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/pages/home/home.component';
import { AboutComponent } from './feature/pages/about/about.component';
import { NotFoundComponent } from './feature/pages/not-found/not-found.component';
import { GetWeatherComponent } from './feature/pages/get-weather/get-weather.component';
import { WorldClockComponent } from './feature/pages/world-clock/world-clock.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'get-weather', component: GetWeatherComponent },
  { path: 'world-clock', component: WorldClockComponent },
  {
    path: 'watches',
    loadChildren: () =>
      import('./feature/watches/watches.module').then((m) => m.WatchesModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
