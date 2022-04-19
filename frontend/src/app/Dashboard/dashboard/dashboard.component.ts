import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  logIn: boolean = false;

  subscriber: Subscription = new Subscription();

  constructor (private _userServ: UserService, private _cookie: CookieService) {
    this.subscriber.add(
      this._userServ.userLogin.subscribe(res => {
        this.logIn = res;
      })
    );
  }

  logout (): void {
    if (this._cookie.check('user')) {
      document.getElementById('usercloseModal').click();
      this._cookie.delete('user');
      this.logIn = false;
    }
  }

  ngOnInit (): void {
    if (this._cookie.check('user')) {
      this.logIn = true;
    }
  }

  ngOnDestroy (): void {
    this.subscriber.unsubscribe();
  }
}
