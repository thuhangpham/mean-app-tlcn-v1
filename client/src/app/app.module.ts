import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersService, AlertService, LocationService,
  AuthenService} from './_services/index';
import { EmploySituationService } from './_services/employ-situation.service';
import { AreaExperService } from './_services/area-exper.service';
import { VerifyService } from './_services/verify.service';


import { LoginComponent } from './_pages/login/login.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { HomeComponent } from './_pages/home/home.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './_directives/alert/alert.component';

@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [UsersService, AuthGuard, AlertService, LocationService,EmploySituationService, 
  AreaExperService, AuthenService,VerifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
