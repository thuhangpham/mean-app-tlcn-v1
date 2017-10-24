import { BrowserModule, Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersService, AlertService, LocationService,
  AuthenService} from './_services/index';
import { EmploySituationService } from './_services/employ-situation.service';
import { AreaExperService } from './_services/area-exper.service';
import { VerifyService } from './_services/verify.service';
import { TabService } from './_services/tab.service';


import { LoginComponent } from './_pages/login/login.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { HomeComponent } from './_pages/home/home.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './_directives/alert/alert.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { TabComponent } from './_pages/tab/tab.component';
@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AlertComponent,
    ProfileComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDY8UvTl6TiF0W_NB7ycIj-feAfVbmftOs",
      libraries: ["places"]
    }),
  ],
  providers: [UsersService, AuthGuard, AlertService, LocationService,EmploySituationService, 
  AreaExperService, AuthenService,VerifyService,
  Title, TabService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
