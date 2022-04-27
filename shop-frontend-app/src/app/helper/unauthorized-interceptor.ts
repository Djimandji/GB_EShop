import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {AuthService} from "../service/auth.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted unauthorized error');
    if (request.url === '/api/v1/login' || request.url === '/api/v1/logout') {
      return next.handle(request);
    }
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        console.log('Intercepted unauthorized error');
        this.auth.logout();
        this.router.navigateByUrl('/login');
      }
      return throwError(err);
    }))
  }

}
