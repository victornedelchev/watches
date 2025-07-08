import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [LoaderComponent, TimeAgoPipe],
  imports: [CommonModule],
  exports: [LoaderComponent, TimeAgoPipe],
})
export class SharedModule {}
