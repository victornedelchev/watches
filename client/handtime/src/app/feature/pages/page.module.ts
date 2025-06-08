import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    TestimonialComponent,
    ContactUsComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HomeComponent, AboutComponent],
})
export class PageModule {}
