import {MatButtonModule} from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VdiTestComponent } from './vdi-test/vdi-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StaticPageComponent } from './static-page/static-page.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from './cookie/cookie.service';
import { ChannelOverviewComponent } from './channel-overview/channel-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    VdiTestComponent,
    StaticPageComponent,
    ChannelOverviewComponent
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
