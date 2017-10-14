import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { appConfig } from '../app.config';
@Injectable()
export class AuthenService {
  private api = appConfig.apiUrl;
  constructor(private http: Http) { }

  // login(email: String, password: String){
  //   return this.http.post('/users/authenticate',{email: email, password: password})
  //   .map((res: Response)=>{res.json()}).subscribe(res=>{
  //    
  //   })
  // }
  login(email,password) :Promise<any> {
    return this.http.post(`${this.api}/user/authenticate`, { email: email, password: password, token : localStorage.getItem("currentToken") })
    .toPromise()
    .then(this.extracData)
    .catch(this.handelError);
  }
  logout(){
    localStorage.removeItem('currentUser');
  }

  private handelError(err: any):Promise<any>{
    return Promise.reject(err.message || err);
  }
  private extracData(res: Response){
      let body = res.json() || {};      
      return body;
  }
}
