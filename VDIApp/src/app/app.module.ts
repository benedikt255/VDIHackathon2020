import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import 'hammerjs';
import { HammerModule } from '@angular/platform-browser';

import {AuthService} from './adapter/linkando/auth/auth.service';
import {CookieService} from './cookie/cookie.service';

import { ConnectIngBaseService, ConnectIngMockService } from './adapter/base/AbstractBaseService';
import { LinkandoService } from './adapter/linkando/linkando.service';


import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StaticPageComponent} from './static-page/static-page.component';
import {ChannelComponent, CreatePostComponent} from './channel/channel.component';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {PostComponent} from './post/post.component';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MainNavComponent} from './main-nav/main-nav.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommentComponent } from './comment/comment.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { CreateCommentComponent } from './post/create-comment.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
   declarations: [
     AppComponent,
     MainNavComponent,
     LoginComponent,
     StaticPageComponent,
     ChannelComponent,
     PostComponent,
     CommentComponent,
     WelcomeComponent,
     CreateCommentComponent,
     CreatePostComponent,
     RegisterDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    HammerModule,
    MatFormFieldModule,
    FormsModule,
    MatBottomSheetModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {provide: ConnectIngBaseService, useClass: LinkandoService},
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
