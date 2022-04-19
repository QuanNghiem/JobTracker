import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = 'secure-user-token';

    const modifiedReq = req.clone(
      {
        headers: req.headers.set('Access-Control-Allow-Headers', 'content-type').set('Access-Control-Allow-Methods', 'POST').set('Access-Control-Allow-Origin', 'https://quannghiem.github.io/').set('Referer', 'https://quannghiem.github.io/')
      }
    )

    return next.handle(modifiedReq);
  }
}
