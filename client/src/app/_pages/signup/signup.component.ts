import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';

import { UsersService, AlertService, LocationService } from '../../_services/index';
import { VerifyService } from '../../_services/verify.service';
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
  isRouteHome = false;

  public latitude: number;
  public address: String;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public google: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private alert: AlertService,
    private usersService: UsersService,
    private router: Router,
    private verifyService: VerifyService,
    private locationService: LocationService,
    private areaExService: AreaExperService,
    private employSTService: EmploySituationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    verifyService.verify().then(res => {
      if (res.result === 1) {
        this.router.navigate(['/home']);
        window.location.reload();
      }
    })
      .catch(err => {

      })

    this.minYear = (new Date().getFullYear() - 100).toString() + "-12-01";
    this.maxYear = ((new Date()).getFullYear() - 10).toString() + "-12-01";
  }

  ngOnInit() {
    this.load();
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log("lat, long " + this.latitude + " " + this.longitude);
          console.log(place);
          this.address = place.formatted_address;
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  signup(value: any) {
    if (value) {
      this.loading = true;
      this.usersService.addUsers(JSON.stringify(value)).subscribe(
        (data) => {
          if (data.json().result === 1) {
            this.loading = false;
            console.log("dang ky OK " + data);
            this.alert.success('Sign up successful!', true);
            this.router.navigate(['/login']);
            window.location.reload();
          } else {
            this.loading = false;
            console.log("dang ky err " + data);
            this.alert.success(`${data.json().msg}`, true);
          }
        },
        (err) => {
          console.log("err " + err);
          this.alert.error(err, false);
          this.loading = false;
        });
    }
  }
  load() {
    // this.locationService.getCities().subscribe(
    //   data => {
    //     if (!data.error) {
    //       this.cities = data;
    //     }
    //   }, err => { console.log(err); });

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
  // loadDistrictByIdCity(id) {
  //   this.locationService.getDistrictByCity(id).subscribe(
  //     data => {
  //       this.districtes = data;
  //       console.log(this.districtes);
  //     }
  //     , err => { console.log(err); });
  // }
  // loadWardByDistrictId(id) {
  //   this.locationService.getWardByDistrict(id).subscribe(
  //     data => {
  //       this.wards = data;
  //       console.log(this.wards);
  //     }
  //     , err => { console.log(err); })
  // }
  // onChangeCity($event) {
  //   this.loadDistrictByIdCity($event);
  //   this.wards = null;
  // }
  // onChangeDistrict($event) {
  //   this.loadWardByDistrictId($event);
  // }
}
