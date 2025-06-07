import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [CommonModule, RouterModule],
  exports: [HomeComponent, AboutComponent],
})
export class PageModule {}
