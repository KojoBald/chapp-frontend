import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ChannelComponent } from './channel/channel.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';


const authorizedRoutes: Routes = [
  {
    path: 'channel',
    component: ChannelComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'createchannel',
    component: CreateChannelComponent
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
