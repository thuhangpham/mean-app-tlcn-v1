import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Users } from '../_models/index';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import { appConfig } from '../app.config';


@Injectable()
export class VerifyService {
  private token: String = '';
  private apiUrl = appConfig.apiUrl;
  constructor(private http: Http) { }
  verify(): Promise<any> {
    let currUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = (currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    console.log(token);
    return this.http.post(`${this.apiUrl}/verify`, { token: token }).toPromise()
      .then(this.extracData)
      .catch(this.handleError);
  }
  private extracData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }
  private handleError(err: any) {
    console.log(err.message || err);
    return err.message || err;
  }
}
