import { User } from './../../model/user';
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { HELP_DESK_API } from '../helpdesk.api';


@Injectable()
export class UserService {
  
  constructor(private http: Http) { }

  login(user: User): Observable<any> {
    return this.http.post(`${HELP_DESK_API}/api/auth`,user)
          .map(response => response.json());
  }
}
