import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SharedModule } from "../../shared/shared.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { GetWeatherComponent } from './get-weather/get-weather.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    TestimonialComponent,
    ContactUsComponent,
    NotFoundComponent,
    GetWeatherComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HomeComponent, AboutComponent],
})
export class PageModule {}
