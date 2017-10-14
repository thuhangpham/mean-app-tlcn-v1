import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, AlertService, LocationService } from '../../_services/index';
import { EmploySituationService } from '../../_services/employ-situation.service';
import { AreaExperService } from '../../_services/area-exper.service';
import { Users, AreaExpertise, City, Ward, District, EmploySituation } from '../../_models/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private loading = false;
  minYear: string;
  maxYear: string;
  cities: City;
  districtes: District = new District();
  wards: Ward;
  areaExs: AreaExpertise;
  employSt: EmploySituation;
  city: Number;
  user: Users = new Users();
  

  constructor(
    private alert: AlertService,
    private usersService: UsersService,
    private router: Router,
    private locationService: LocationService,
    private areaExService: AreaExperService,
    private employSTService: EmploySituationService) {
      this.minYear = (new Date().getFullYear() - 100).toString() + "-01-01";
      this.maxYear = ((new Date()).getFullYear() - 10).toString() + "-01-01";
  }

  ngOnInit() {
    this.load();
  }
  signup(value: any) {
    console.log(JSON.stringify(value));
    this.loading = true;
    this.usersService.addUsers(JSON.stringify(value)).subscribe(
      (data) => {
        if (data.json().result === 1) {
          console.log("data " + data);
          this.alert.success('Sign up successful!', true);
          this.router.navigate(['/login']);
          window.location.reload();
        }
      },
      (err) => {
        console.log("err " + err);
        this.alert.error(err, false);
        this.loading = false;
      });
  }
  load() {
    this.locationService.getCities().subscribe(
      data => {
        if (!data.error) {
          this.cities = data;
        }
      }, err => { console.log(err); });

    this.employSTService.getEmploySituations().subscribe(
      data => {
        this.employSt = data;
        console.log(this.employSt);
      }, err => { console.log(err); }
    );

    this.areaExService.getAreaEx().subscribe(
      data => {
        this.areaExs = data;
        console.log(this.areaExs);
      }, err => { console.log(err); }
    );

  }
  loadDistrictByIdCity(id){
    this.locationService.getDistrictByCity(id).subscribe(
      data=>{
          this.districtes = data;
          console.log(this.districtes);
      }
    ,err=>{console.log(err);});
  }
  loadWardByDistrictId(id){
    this.locationService.getWardByDistrict(id).subscribe(
      data=>{
          this.wards = data;
          console.log(this.wards);
      }
  ,err=>{console.log(err);})
  }
  onChangeCity($event){
    this.loadDistrictByIdCity($event);
    this.wards = null;
  }
  onChangeDistrict($event){
      this.loadWardByDistrictId($event);
  }
}
