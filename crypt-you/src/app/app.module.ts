import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PrivypolicyComponent } from './privypolicy/privypolicy.component';
import { AboutsComponent } from './abouts/abouts.component';
import { LogoutComponent } from './logout/logout.component';
import {CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserPageComponent,
    PrivypolicyComponent,
    AboutsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LogoutComponent,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
