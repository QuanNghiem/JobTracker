import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogin: Subject<any> = new Subject();

  url = 'https://q-jobtrackerapi.azurewebsites.net/api';

  constructor (private _client: HttpClient, private _cookie: CookieService) {
    if (this._cookie.check('user')) {
      this.userLogin.next(true);
    }
  }

  login (body: any) {
    this._client.post(this.url + '/login', body).subscribe(res => {
      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() + 15);
      this._cookie.set('user', res['Id'], dateNow);
      this.userLogin.next(true);
    });
  }

  register (body: any) {
    this._client.post(this.url + '/register', body).subscribe(res => {
      const dateNow = new Date();
      dateNow.setDate(dateNow.getDate() + 15);
      this._cookie.set('user', res['Id'], dateNow);
      this.userLogin.next(true);
    });
  }
}
