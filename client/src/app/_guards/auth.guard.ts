import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VerifyService } from '../_services/verify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private verifyService: VerifyService) { }
  canActivate() {
    return this.verifyService.verify().then(res => {
      if (res.result === 1) {
        return true;
      } else {
        return false;
      }
    })
      .catch(err => {
        Promise.reject(err || '');
        return false;
      });
  }
}
