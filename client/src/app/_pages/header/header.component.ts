import { Component, OnInit } from '@angular/core';

import { VerifyService } from '../../_services/verify.service';
import { AlertService } from '../../_services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogin = false;
  isRouteLogin = false;
  isRouteSignup = false;
  image = "";
  username = "";
  constructor(private route: Router, private alert: AlertService,
    private verifyService: VerifyService){

    verifyService.verify().then((res) => {
      if (res.result === 1) {
        this.isLogin = true;
        let currUser = JSON.parse(localStorage.getItem('currentUser')).user;
        this.image = currUser.image;
        this.username = currUser.info.fullname;
      }else{
      }
      // }else alert.error("");
    }, err => {
    });

    if (window.location.pathname === '/login' || this.route.url === '/login')
      this.isRouteLogin = true;
    if (window.location.pathname === '/signup' || this.route.url === '/signup')
      this.isRouteSignup = true;
    console.log(window.location.pathname);
    console.log("this.route.url " + this.route.url)
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.route.navigate(['/login']);
    //window.location.reload();
  }
  signup() {
    this.route.navigate(['/signup']);
    //window.location.reload();
  }
  login() {
    this.route.navigate(['/login']);
    //window.location.reload();
  }
}
