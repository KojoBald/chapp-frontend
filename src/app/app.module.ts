import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChannelComponent } from './components/channel/channel.component';
import { CreateChannelComponent } from './components/modals/create-channel/create-channel.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LayoutComponent,
    MessageBoxComponent,
    ProfileComponent,
    ChannelComponent,
    CreateChannelComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateChannelComponent]
})
export class AppModule { }
