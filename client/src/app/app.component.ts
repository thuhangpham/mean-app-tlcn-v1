import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { VerifyService } from './_services/verify.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private location: PlatformLocation, private router:Router,
     private verifyService: VerifyService) {

    location.onPopState(() => {
      verifyService.verify().then(res => {
        if (res.result !== 1) {
          this.router.navigate(["/home"]);
        }
      }).catch(err => {  })
      console.log('pressed back!');
    
    });
  }
}
