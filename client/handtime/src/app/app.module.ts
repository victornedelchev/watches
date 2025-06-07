import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageModule } from './feature/pages/page.module';
import { WatchesModule } from './feature/watches/watches.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PageModule,
    WatchesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
