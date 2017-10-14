import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from '../../_services/authen.service';
import { AlertService } from '../../_services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: any;
  private password: any;
  loading = false;
  constructor(private authen: AuthenService, private alert: AlertService, private router: Router) { }

  ngOnInit() {
  }
  login(value: any) {
    if (value) {
      this.loading = true;
      this.authen.login(this.email, this.password).then((data) => {
        this.loading = false;
        if (data.result === 1) {
          if (data || data.token)
            localStorage.setItem('currentUser', JSON.stringify({email: this.email, token: data.token}));
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
