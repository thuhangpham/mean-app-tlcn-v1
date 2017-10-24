import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common'

import { VerifyService } from '../app/_services/verify.service';
import { AlertService } from '../app/_services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLogin = false;
  isRouteHome = true;
  image = "";
  username = "";
  constructor(private route: Router, private alert: AlertService,
    private verifyService: VerifyService,
    private location: PlatformLocation) {

    location.onPopState(() => {
      console.log('pressed back!');
      window.location.reload();

    });
    

    verifyService.verify().then((res) => {
      if (res.result === 1) {
        this.isLogin = true;
        let currUser = JSON.parse(localStorage.getItem('currentUser')).user;
        this.image = currUser.image;
        this.username = currUser.info.fullname;
      }
      // }else alert.error("");
    }, err => {
      this.isLogin = false;
    });

    if (window.location.pathname === '/login' || this.route.url === '/login')
      this.isRouteHome = false;
    if (window.location.pathname === '/signup' || this.route.url === '/signup')
      this.isRouteHome = false;
    console.log(window.location.pathname);
    console.log("this.route.url " + this.route.url)
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.route.navigate(['/login']);
    window.location.reload();
  }
  signup() {
    this.route.navigate(['/signup']);
    window.location.reload();
  }
  login() {
    this.route.navigate(['/login']);
    window.location.reload();
  }
}
