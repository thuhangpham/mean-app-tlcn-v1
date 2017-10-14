import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocationService {
  private apiGetCities = "http://prod.boxme.vn/api/public/api/merchant/rest/lading/city";
  private apiGetDistrictByCity = "http://prod.boxme.vn/api/public/api/merchant/rest/lading/province";
  private apiGetWardByDistrict = "http://prod.boxme.vn/api/public/api/merchant/rest/lading/ward";
  constructor(private http: Http) { }
  getCities():Observable<any>{
    return this.http.get(this.apiGetCities)
    .map(this.extractData)
    .catch(this.handelError);
  }
  getDistrictByCity(id):Observable<any>{
    return this.http.get(`${this.apiGetDistrictByCity}/${id}`)
    .map(this.extractData)
    .catch(this.handelError);
  }
  getWardByDistrict(id):Observable<any>{
    return this.http.get(`${this.apiGetWardByDistrict}/${id}`)
    .map(this.extractData)
    .catch(this.handelError);
  }
  private handelError(err: any){
    return Observable.throw(err.json().error || 'Server error!');
  }
  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }
}
