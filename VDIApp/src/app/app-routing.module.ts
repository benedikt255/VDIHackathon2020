import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//Screen 1
import {LoginComponent} from './login/login.component';
//Screen 2
import {ChannelOverviewComponent} from './channel-overview/channel-overview.component';
//Screen 3
import {PostComponent} from './post/post.component';
//Screen 4
import {CreatePostComponent} from './create-post/create-post.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'channel-overview', component: ChannelOverviewComponent},
  {path: 'post', component: PostComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
