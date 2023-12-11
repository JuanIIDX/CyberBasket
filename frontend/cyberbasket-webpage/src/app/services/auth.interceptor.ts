import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("login")) {
      return next.handle(request);
    }

    const access_token = sessionStorage.getItem("access_token");

    const reqClone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`
      }
    })

    return next.handle(reqClone);
  }
}
