import { Component } from '@angular/core';

import { AuthenService } from '../app/_services/authen.service'
import { VerifyService } from '../app/_services/verify.service';
import { AlertService } from '../app/_services/alert.service';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLogin = false;
  isRouteSignUp = false;
  isRouteLogin = false;
  constructor(private route: Router, private alert: AlertService,
    private authen: AuthenService, private verifyService: VerifyService) {
    // this.headers.append("Access-Control-Allow-Origin", "*"); 
    verifyService.verify().then((res)=>{
      console.log(JSON.stringify(res));
      if(res.result===1)
        this.isLogin = true;  
      // }else alert.error("");
    }, err=>{
      this.isLogin = false;  
    });

    if (window.location.pathname === '/login')
      this.isRouteLogin = true;
    if (window.location.pathname === '/signup')
      this.isRouteSignUp = true;
      console.log(window.location.pathname);
      console.log("this.route.url " +this.route.url);
  }
  logout() {
    this.authen.logout();
    this.route.navigate(['/login']);
    window.location.reload();
  }
  signup(){
    this.route.navigate(['/signup']);
    window.location.reload();
  }
  login(){
    this.route.navigate(['/login']);
    window.location.reload();
  }
}
