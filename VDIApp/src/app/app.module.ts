import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AuthService} from './adapter/linkando/auth/auth.service';
import {CookieService} from './cookie/cookie.service';

import { ConnectIngBaseService, ConnectIngMockService } from './adapter/base/AbstractBaseService';
import { ConnectIngCtrl } from './controller/ConnectIngCtrl';
import { ChannelCtrl } from './controller/ChannelCtrl';
import { PostCtrl } from './controller/PostCtrl';
import { CommentCtrl } from './controller/CommentCtrl';

/* ./channel/channel.component */

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StaticPageComponent} from './static-page/static-page.component';

import {ChannelComponent} from './channel/channel.component';
import {MatButtonModule} from '@angular/material/button';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {CreatePostComponent} from './create-post/create-post.component';
import {PostComponent} from './post/post.component';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MainNavComponent} from './main-nav/main-nav.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommentComponent } from './comment/comment.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
   declarations: [
     AppComponent,
     MainNavComponent,
     LoginComponent,
     StaticPageComponent,
     ChannelComponent,
     CreatePostComponent,
     PostComponent,
     CommentComponent,
     WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [
    {provide: ConnectIngBaseService, useClass: ConnectIngMockService},
    ConnectIngCtrl,
    ChannelCtrl,
    PostCtrl,
    CommentCtrl,
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
