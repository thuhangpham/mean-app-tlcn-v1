import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Users } from '../_models/index';
import 'rxjs/add/operator/toPromise';
import { appConfig } from '../app.config';

@Injectable()
export class UsersService {
  apiUrl = appConfig.apiUrl;
  private headers = new Headers({ 'Content-Type': 'applicaton/json' });
  constructor(private http: Http) {
    // this.headers.append("Access-Control-Allow-Origin", "*");
  }
  getAll(): Promise<any> {
    return this.http.get(`${this.apiUrl}/users`)
      .toPromise()
      .then(this.extracData)
      .catch(this.handleError);
  }
  getUsersById(id): Promise<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`, { headers: this.headers })
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
  addUsers(user) {
    console.log('user ' + user);
    //var u = { "first_name":"Hang" };
    var u: Users;
    u = new Users();
    u = JSON.parse(user);
    return this.http.post(`${this.apiUrl}/user`, u);

  }
  updateUser(user) {
    return this.http.put(`${this.apiUrl}/user`, user);
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error.message); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  private extracData(res: Response) {
    let body = res.json();
    return body || {};
  }
  updateLocal(data, token) {
    if (!token)
      token = JSON.parse(localStorage.getItem('currentUser')).token;
    if (data || token) {
      let u = {
        contact: {
          email: data.contact.email
        },
        info: {
          fullname: data.info.first_name + " " + data.info.last_name
        },
        _id: data._id,
        image: data.image
      };
      localStorage.setItem('currentUser', JSON.stringify({ user: u, token: token }));
    }
  }
}
