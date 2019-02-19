import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ChannelComponent } from './components/channel/channel.component';


const authorizedRoutes: Routes = [
  {
    path: 'channel',
    component: ChannelComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
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
