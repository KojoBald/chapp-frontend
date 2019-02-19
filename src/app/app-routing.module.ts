import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ChannelComponent } from './channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';

const authorizedRoutes: Routes = [
  {
    path: 'channel/:id',
    component: ChannelComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
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
