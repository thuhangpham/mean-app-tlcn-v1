import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Users } from '../_models/index';
import 'rxjs/add/operator/toPromise';
import { appConfig } from '../app.config';

@Injectable()
export class UsersService {
  apiUrl = appConfig.apiUrl;
  private headers = new Headers({'Content-Type':'applicaton/json'});
  constructor(private http: Http) { 
    // this.headers.append("Access-Control-Allow-Origin", "*");
  }
  getAll(): Promise<any>{
    return this.http.get(`${this.apiUrl}/users`)
    .toPromise()
    .then(this.extracData)
    .catch(this.handleError);
  }
  getUsersById(id):Promise<any>{
    return this.http.get(`${this.apiUrl}/user/${id}`, {headers: this.headers})
    .toPromise()
    .then(this.extracData)
    .catch(this.handleError);
  }
  // addUsers(user):Promise<any>{
  //   console.log('user '+user);
  //   return this.http.post(`${this.apiUrl}/user`, user)
  //   .toPromise()
  //   .then(this.extracData)
  //   .catch(this.handleError);
  // }
  addUsers(user){
    console.log('user '+user);
    //var u = { "first_name":"Hang" };
    var u: Users;
    u = new Users();
    u = JSON.parse(user);
    return this.http.post(`${this.apiUrl}/user`, u);

  }
  private handleError(err: any){
    console.log(err.message || err);
    return err.message || err;
  }
  private extracData(res: Response){
    let body = res.json();
    return body || {};
  }
}
