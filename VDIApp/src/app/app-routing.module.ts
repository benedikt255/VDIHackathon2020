import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VdiTestComponent } from './vdi-test/vdi-test.component';
import { ChannelOverviewComponent} from './vdi-test/vdi-test.component';
import { StaticPageComponent } from './static-page/static-page.component';


const routes: Routes = [
  { path: 'vdi-test', component: VdiTestComponent },
  { path: 'static-page', component: StaticPageComponent },
  { path: '',   redirectTo: '/vdi-test', pathMatch: 'full' },
  { path: '**', component:  VdiTestComponent}
  //{ path: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
