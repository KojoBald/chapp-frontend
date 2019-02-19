import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChannelComponent } from './components/channel/channel.component';
import { Stepper } from './components/auth/stepper/stepper'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LayoutComponent,
    MessageBoxComponent,
    ProfileComponent,
    ChannelComponent,
    Stepper
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
