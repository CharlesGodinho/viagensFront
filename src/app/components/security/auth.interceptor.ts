import { Injectable } from '@angular/core';
import { SharedService } from './../../services/shared.service';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    shared : SharedService;
    constructor() { 
          this.shared = SharedService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {

        let authRequest : any;
        if(this.shared.isLoggedIn()){
            console.log('entrou no if ',req);
            authRequest = req.clone({
                setHeaders: {
                    'Authentication' : this.shared.token
                }
            });
            console.log('FIM DO no if ',authRequest);
            return next.handle(authRequest);
        } else {
            console.log('entrou no ELSE ',req);
            return next.handle(req);
        }
    }

}