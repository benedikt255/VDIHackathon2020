import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Screen 1
import {LoginComponent} from './login/login.component';
// Screen 2
import {ChannelComponent} from './channel/channel.component';
// Screen 3
import {PostComponent} from './post/post.component';
// Screen 4
import {WelcomeComponent} from './welcome/welcome.component';
import {CommentComponent} from './comment/comment.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'channel', component: ChannelComponent},
  {path: 'post', component: PostComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
