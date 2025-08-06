import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SharedModule } from "../../shared/shared.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { GetWeatherComponent } from './get-weather/get-weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorldClockComponent } from './world-clock/world-clock.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    GetWeatherComponent,
    WorldClockComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, FontAwesomeModule],
  exports: [HomeComponent, AboutComponent],
})
export class PageModule { }
