import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Api } from 'src/app/helpers/api';
import { Account } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginForm.updateValueAndValidity();
  }

  handleLogin() {
    console.log('Logging in', this.loginForm.value);
    let payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(new Account.Login(payload));
  }
  handleSocialLogin() {
    Api.account().createOAuth2Session(
      'google',
      'http://localhost:4200/todos',
      'http://localhost:4200/login'
      // ['userinfo.email', 'userinfo.profile']
    );
  }
}
