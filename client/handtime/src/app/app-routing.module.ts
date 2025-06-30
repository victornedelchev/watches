import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/pages/home/home.component';
import { AboutComponent } from './feature/pages/about/about.component';
import { TestimonialComponent } from './feature/pages/testimonial/testimonial.component';
import { ContactUsComponent } from './feature/pages/contact-us/contact-us.component';
import { NotFoundComponent } from './feature/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'watches',
    loadChildren: () =>
      import('./feature/watches/watches.module').then((m) => m.WatchesModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'testimonial', component: TestimonialComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
