import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});

  constructor (private _userServ: UserService) { }
  ngOnInit (): void {
    this.initUserForm();
  }

  initUserForm (): void {
    this.userForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  login () {
    let body = {
      username: this.userForm.controls['user'].value,
      pass: this.userForm.controls['pass'].value
    }

    this._userServ.login(body);
    this.userForm.reset();
  }

  register () {
    let body = {
      username: this.userForm.controls['user'].value,
      pass: this.userForm.controls['pass'].value
    }

    this._userServ.register(body);
    this.userForm.reset();
  }

}
