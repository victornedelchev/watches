import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { storageServiceProvider } from './storage.service';
import { HttpClientModule } from '@angular/common/http';
import { DigitalClockComponent } from './header/digital-clock/digital-clock.component';
import { WeatherComponent } from './header/weather/weather.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DigitalClockComponent, WeatherComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [storageServiceProvider],
})
export class CoreModule {}
