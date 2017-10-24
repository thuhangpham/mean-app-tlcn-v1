import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_pages/home/home.component';
import { AuthGuard } from './_guards/index';
import { LoginComponent } from './_pages/login/login.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { ProfileComponent} from './_pages/profile/profile.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent},
    { path: 'login', component:  LoginComponent},
    { path: 'signup', component:  SignupComponent},
    { path: 'home', component:  HomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: '' }
]
export const routing = RouterModule.forRoot(appRoutes);
