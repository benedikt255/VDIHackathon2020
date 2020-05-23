import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StaticPageComponent } from './static-page/static-page.component';
import { AuthService } from './adapter/linkando/auth/auth.service';
import { CookieService } from './cookie/cookie.service';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ChannelOverviewComponent } from './channel-overview/channel-overview.component';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {CreatePostComponent} from './create-post/create-post.component';
import {PostComponent} from './post/post.component';
import {MatCardModule} from '@angular/material/card';
import {LoginComponent} from './login/login.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@NgModule({
   declarations: [
     AppComponent,
     MainNavComponent,
     LoginComponent,
     StaticPageComponent,
     ChannelOverviewComponent,
     CreatePostComponent,
     PostComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
