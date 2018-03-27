import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from "./shared/service/user.service";
import { AuthService } from "./shared/service/auth.service";
import {AuthGuard} from './shared/service/auth.guard';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
      NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
