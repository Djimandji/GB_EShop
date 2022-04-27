import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Credentials} from "../../model/credentials";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  credentials: Credentials = new Credentials("", "");

  isError: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.authenticate(this.credentials)
      .subscribe(authResult => {
        this.isError = false;
        if (authResult.callbackAfterSuccess) {
          authResult.callbackAfterSuccess();
        }
        if (authResult.redirectUrl) {
          this.router.navigateByUrl(authResult.redirectUrl);
        } else {
          this.router.navigateByUrl('/product');
        }
      }, error => {
        this.isError = true;
        console.log(`Authentication error ${error}`);
      })
  }
}
