import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HELP_DESK_API } from '../helpdesk.api';


@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) {}

  login(user: User){
    return this.http.post(`${HELP_DESK_API}/api/auth`,user);
  }

  create(user: User){
    return this.http.post(`${HELP_DESK_API}/api/user`, user);
  }

  update(user: User){
    return this.http.put(`${HELP_DESK_API}/api/user`,user);
  }
}
