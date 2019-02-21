import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ChannelComponent } from './components/channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';

const authorizedRoutes: Routes = [
  {
    path: 'channel/:id',
    component: ChannelComponent
  },
  {
    path: 'dm/:id',
    component: DirectMessageComponent
  }
];

const routes: Routes = [
  { 
    path: 'auth', 
    component: AuthComponent 
  },
  { 
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuardService ],
    children: authorizedRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
