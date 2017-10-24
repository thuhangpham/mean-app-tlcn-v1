import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VerifyService } from '../../_services/verify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private titleService: Title, private verifyService: VerifyService,
    private router: Router) {
    verifyService.verify().then(res => {
      if (res.result === 0) {
        this.router.navigate(['/home']);
        window.location.reload();
      }
    })
      .catch(err => {
        this.router.navigate(['/home']);
        window.location.reload();
      })
    let currUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.titleService.setTitle(currUser.info.fullname);
  }

  ngOnInit() {
  }

}
