import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { storageServiceProvider } from './storage.service';
import { DigitalClockComponent } from './header/digital-clock/digital-clock.component';
import { WeatherComponent } from './header/weather/weather.component';
import { SharedModule } from '../shared/shared.module';
import { hoverDirective } from './header/hover.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DigitalClockComponent, WeatherComponent, hoverDirective],
  imports: [CommonModule, RouterModule, SharedModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [storageServiceProvider],
})
export class CoreModule { }
