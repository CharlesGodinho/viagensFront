import { SharedService } from './../shared.service';
import { User } from './../../model/user';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HELP_DESK_API } from '../helpdesk.api';


@Injectable()
export class UserService {
  
  shared : SharedService;
  
  constructor(private http: HttpClient) {
    this.shared = SharedService.getInstance();
   }

  login(user: User): Observable<any> {
    return this.http.post(`${HELP_DESK_API}/api/auth`,user);
  }

  create(user: User): Observable<any> {
    console.log('user no service -->',user);
    console.log('token -->',this.shared.token);
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //headers.append('Authorization',this.shared.token);
    //let options = new RequestOptions();
    //options.headers = headers;
    //console.log('headers -->',headers);
    //console.log('options -->',options);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`${this.shared.token}`);
    console.log('headers -->',headers);
    return this.http.post(`${HELP_DESK_API}/api/user`, user , {headers:headers});
  }

  update(user: User): Observable<any> {
    return this.http.put(`${HELP_DESK_API}/api/user`,user);
  }
}
