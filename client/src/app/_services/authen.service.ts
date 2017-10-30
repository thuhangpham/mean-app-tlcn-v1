import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { appConfig } from '../app.config';
@Injectable()
export class AuthenService {
  private api = appConfig.apiUrl;
  constructor(private http: Http) {
    // FB.init({
    //   appId      : "YOUR-APP-ID-HERE",
    //   status     : false, // the SDK will attempt to get info about the current user immediately after init
    //   cookie     : true,  // enable cookies to allow the server to access
    //   // the session
    //   xfbml      : true,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
    //   version    : 'v2.8' // use graph api version 2.5
    // });
  }
  // fbLogin() {
  //   return new Promise((resolve, reject) => {
  //     FB.login(result => {
  //       if (result.authResponse) {
  //         return this.http.post(`http://localhost:4000/api/v1/auth/facebook`, {access_token: result.authResponse.accessToken})
  //             .toPromise()
  //             .then(response => {
  //               var token = response.headers.get('x-auth-token');
  //               if (token) {
  //                 localStorage.setItem('id_token', token);
  //               }
  //               resolve(response.json());
  //             })
  //             .catch(() => reject());
  //       } else {
  //         reject();
  //       }
  //     }, {scope: 'public_profile,email'})
  //   });
  // }

  // login(email: String, password: String){
  //   return this.http.post('/users/authenticate',{email: email, password: password})
  //   .map((res: Response)=>{res.json()}).subscribe(res=>{
  //    
  //   })
  // }
  login(email, password): Promise<any> {
    return this.http.post(`${this.api}/user/authenticate`, { email: email, password: password, token: localStorage.getItem("currentToken") })
      .toPromise()
      .then(this.extracData)
      .catch(this.handelError);
  }
  logout() {
    localStorage.removeItem('currentUser');
  }

  private handelError(err: any): Promise<any> {
    return Promise.reject(err.message || err);
  }
  private extracData(res: Response) {
    let body = res.json() || {};
    return body;
  }
}
