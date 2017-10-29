import { Component, OnInit, NgZone,ElementRef,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { } from 'googlemaps';

import { Users} from '../../_models/index';
import { AlertService } from '../../_services/alert.service';
import { UsersService } from '../../_services/users.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  user: Users = new Users();
  loading: any = false;
  email: any;
  phone: any;
  web_page: any;

  public latitude: String;
  public lat: number;
  public address: String;
  public longitude: String;
  public long: number; 
  public searchControl: FormControl;
  public zoom: number;
  public google: any;
  private autocomplete:  google.maps.places.Autocomplete;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private userService: UsersService, private alertService: AlertService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
      this.lat = 10.8480966697085;
      this.long = 106.81203118029157;
      let id = JSON.parse(localStorage.getItem('currentUser')).user._id;
      this.userService.getUsersById(id).catch(err => { console.log(err) })
        .then(data => {
          if (data.result === 1) {
            this.user = data.data;
            this.email = this.user.contact.email;
            this.phone = this.user.contact.phone;
            this.web_page = this.user.contact.web_page; 
            if(this.user.address_residence.latitude){
              this.latitude =  this.user.address_residence.latitude.toString();
              this.lat = Number.parseFloat(this.latitude.toString());
            }
            if(this.user.address_residence.longitude){
              this.longitude =  this.user.address_residence.longitude.toString();
              this.long = Number.parseFloat(this.longitude.toString());
            }
            this.address = this.user.address_residence.address;
            
          }
        })
    }
    ngOnInit() {
      //set google maps defaults
      this.zoom = 12;  
      //create search FormControl
      this.searchControl = new FormControl();

      this.setCurrentPosition();
      
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {    
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        this.autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
  
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            //set latitude, longitude and zoom
            this.latitude = place.geometry.viewport.toJSON().south.toString();
            this.longitude = place.geometry.viewport.toJSON().east.toString();
            this.lat =  place.geometry.location.lat();
            this.long =  place.geometry.location.lng();
            
            this.address = place.formatted_address;
            this.zoom = 12;
          });
        });
      });
    }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude.toString();
        this.longitude = position.coords.longitude.toString();
        this.zoom = 12;
      });
    }
  }
  save(val: any){
    if(val){
      if(!this.latitude || !this.longitude){
        this.alertService.error("Address is incorrect!");
        return;
      }
      this.loading = true;
      this.user.contact.email = this.email;
      this.user.contact.phone = this.phone;
      this.user.contact.web_page = this.web_page;
      this.user.address_residence.address = this.address;
      this.user.address_residence.latitude = this.latitude.toString();
      this.user.address_residence.longitude = this.longitude.toString();
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
