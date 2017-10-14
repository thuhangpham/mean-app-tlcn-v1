import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { appConfig } from '.././app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class EmploySituationService {
  private api: any;
  constructor(private http: Http) { 
    this.api = appConfig.apiUrl;
  }
  getEmploySituations():Observable<any>{
    return this.http.get(`${this.api}/employsituations`)
    .map(this.extractData)
    .catch(this.handelError);
  }
  getEmploySituationById(id):Observable<any>{
    return this.http.get(`${this.api}/employsituation/${id}`)
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
