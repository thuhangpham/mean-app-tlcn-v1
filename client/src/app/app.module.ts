import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {
  UsersService, AlertService, LocationService,
  AuthenService
} from './_services/index';
import { EmploySituationService } from './_services/employ-situation.service';
import { AreaExperService } from './_services/area-exper.service';
import { VerifyService } from './_services/verify.service';

import { LoginComponent } from './_pages/login/login.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { HomeComponent } from './_pages/home/home.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './_directives/alert/alert.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from './_pages/header/header.component';
import { FooterComponent } from './_pages/footer/footer.component';
import { PostComponent } from './_pages/post/post.component';
import { InfoComponent } from './_pages/info/info.component';
import { AboutComponent } from './_pages/about/about.component';
import { ContactComponent } from './_pages/contact/contact.component';
import { AccountComponent } from './_pages/account/account.component';
import { SecurityComponent } from './_pages/security/security.component';
@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AlertComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent,
    InfoComponent,
    AboutComponent,
    ContactComponent,
    AccountComponent,
    SecurityComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDY8UvTl6TiF0W_NB7ycIj-feAfVbmftOs',
      libraries: ['places']
    }),
  ],
  providers: [UsersService, AuthGuard, AlertService, LocationService, EmploySituationService,
    AreaExperService, AuthenService, VerifyService,
    SecurityComponent,
    AuthGuard,
    Title, InfoComponent, AccountComponent, AboutComponent, ContactComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
