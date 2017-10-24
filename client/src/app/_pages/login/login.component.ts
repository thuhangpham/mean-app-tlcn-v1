import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from '../../_services/authen.service';
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
  title = "Log in";
  constructor(private authen: AuthenService,
    private alert: AlertService, private router: Router,
    private verifyService: VerifyService) {
    verifyService.verify().then(res => {
      if (res.result === 1) {
        this.router.navigate(['/home']);
        window.location.reload();
      }
    })
      .catch(err => { })
  }


  ngOnInit() {
  }
  login(value: any) {
    if (value) {
      this.loading = true;
      this.authen.login(this.email, this.password).then((data) => {
        this.loading = false;
        if (data.result === 1) {
          let u = {
            contact: { email: this.email },
            info: {
              first_name: data.data.info.first_name,
              last_name: data.data.info.first_name,
              fullname: data.data.info.first_name+" "+data.data.info.last_name
            },
            image: data.data.image
          };
          if (data || data.token)
            localStorage.setItem('currentUser', JSON.stringify({ user: u, token: data.token }));
          this.router.navigate(['/home']);
          window.location.reload();
        }
        else this.alert.error(data.msg);
      }).catch(err => {
        this.loading = false;
        this.alert.error(err);
      })
    }
  }
}
