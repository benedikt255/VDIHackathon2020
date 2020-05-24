import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import 'hammerjs';

import {AuthService} from './adapter/linkando/auth/auth.service';
import {CookieService} from './cookie/cookie.service';

import {ConnectIngBaseService} from './adapter/base/AbstractBaseService';
import {LinkandoService} from './adapter/linkando/linkando.service';

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
import {CommentComponent} from './comment/comment.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {CreateCommentComponent} from './post/create-comment.component';
import {CreatePostComponent} from './channel/create-post.component';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PromptComponent } from './prompt/prompt.component';
import {PwaService} from './pwa.service';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

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
    RegisterDialogComponent,
    PromptComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
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
    MatDialogModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: ConnectIngBaseService, useClass: LinkandoService},
    AuthService,
    CookieService,
    {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
