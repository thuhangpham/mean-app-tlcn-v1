import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthenService } from '../../_services/authen.service';
import { UsersService } from '../../_services/users.service';
import { AlertService } from '../../_services/alert.service';
import { VerifyService } from '../../_services/verify.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: any;
  private password: any;
  loading = false;
  isRouteHome = false;
  constructor(private authen: AuthenService,
    private alert: AlertService, private router: Router,
    private verifyService: VerifyService,
    private titleService: Title,
    private userService: UsersService) {

    verifyService.verify().then(res => {
      if (res.result === 1) {
        this.router.navigate(['/']);
      }
    }) .catch(err => { })
  }
  ngOnInit() {
    this.titleService.setTitle("Volunteer | Login");
  }
  login(value: any) {
    let that = this;
    if (value) {
      this.loading = true;
      this.authen.login(this.email, this.password).then((data) => {
        this.loading = false;
        if (data.result === 1) {
          if (data.data || data.token){
            that.userService.updateLocal(data.data, data.token);
          }
          this.router.navigate(['/home']);
        }
        else this.alert.error(data.msg);
      }).catch(err => {
        this.loading = false;
        this.alert.error(err);
        console.log(err);
      })
    }
  }
}
