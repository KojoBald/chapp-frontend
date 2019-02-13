import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { DisplayMessageComponent } from './display-message/display-message.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LayoutComponent,
    DisplayMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
