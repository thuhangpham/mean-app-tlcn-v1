import { Routes, RouterModule, CanActivate, CanActivateChild } from '@angular/router';

import { HomeComponent } from './_pages/home/home.component';
import { AuthGuard } from './_guards/index';
import { LoginComponent } from './_pages/login/login.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { PostComponent } from './_pages/post/post.component';
import { InfoComponent } from './_pages/info/info.component';
import { ContactComponent } from './_pages/contact/contact.component';
import { AccountComponent } from './_pages/account/account.component';
import { AboutComponent } from './_pages/about/about.component';
import { SecurityComponent } from './_pages/security/security.component';
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'profile', component: ProfileComponent
        , children: [
            { path: 'info', component: InfoComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'security', component: SecurityComponent }
        ]
    },
    { path: 'post', component: PostComponent },
    { path: '**', redirectTo: '' }
]
export const routing = RouterModule.forRoot(appRoutes);
