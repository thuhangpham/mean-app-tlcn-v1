import { Component, OnInit } from '@angular/core';
import { Users } from '../../_models/index';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AlertService } from '../../_services/alert.service';
import { UsersService } from '../../_services/users.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  minYear: string;
  maxYear: string;
  city: Number;
  user: Users = new Users();
  dob: any;
  gender: any;
  last_name: any;
  first_name: any;
  loading: any = false;
  constructor(private userService: UsersService, private alertService: AlertService) {
    this.minYear = (new Date().getFullYear() - 100).toString() + "-12-01";
    this.maxYear = ((new Date()).getFullYear() - 10).toString() + "-12-01";
    let id = JSON.parse(localStorage.getItem('currentUser')).user._id;
    this.userService.getUsersById(id).catch(err => { console.log(err) })
      .then(data => {
        if (data.result === 1) {
          this.user = data.data;
          this.dob = (this.user.info.dob + "").substring(0, 10);
          this.last_name = this.user.info.last_name;
          this.first_name = this.user.info.first_name;
          this.gender = this.user.info.gender;
        }
      })
  }

  ngOnInit() {

  }
  save(val: any) {
    if (val) {
      this.loading = true;
      this.user.info.first_name = this.first_name;
      this.user.info.last_name = this.last_name;
      this.user.info.dob = this.dob;
      this.user.info.gender = this.gender;
      console.log(this.user);
      this.userService.updateUser(this.user).subscribe(data => {
        this.loading = false;
        if (data.json().result === 1) {
          this.alertService.success("Update completed!");
        }
        else this.alertService.error(data.json().msg);
      })
    }
  }
}

