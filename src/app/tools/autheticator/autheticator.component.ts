import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autheticator',
  templateUrl: './autheticator.component.html',
  styleUrl: './autheticator.component.css'
})
export class AutheticatorComponent {
  state = AuthenticatorState.SignUp;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }

  onLoginButtonClick() {
    console.log(this.email);
    console.log(this.password);
  }

  onCreateAccountClick() {
    this.state = AuthenticatorState.SignUp;
    console.log("Create Account Clicked");
  }

  onLoginClick() {
    this.state = AuthenticatorState.Login;
  }

  onForgotPasswordClick() {
    this.state = AuthenticatorState.ForgotPassword;
    console.log("Forgot Password Clicked");
  }

  isLoginState() {
    return this.state == AuthenticatorState.Login;
  }
  isSignUpState() {
    return this.state == AuthenticatorState.SignUp;
  }
  isForgotPasswordState() {
    return this.state == AuthenticatorState.ForgotPassword;
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorState.Login:
        return "Login";
      case AuthenticatorState.SignUp:
        return "Sign Up";
      case AuthenticatorState.ForgotPassword:
        return "Forgot Password";
    }
  }
}

export enum AuthenticatorState {
  Login,
  SignUp,
  ForgotPassword
}
