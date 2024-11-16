import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autheticator',
  templateUrl: './autheticator.component.html',
  styleUrls: ['./autheticator.component.css']
})
export class AutheticatorComponent {
  state = AuthenticatorState.SignUp;
  email: string;
  password: string;
  public loggedIn: boolean = false;

  constructor(private router: Router) {
    this.email = "";
    this.password = "";
  }

  onLoginButtonClick() {
    console.log(this.email);
    console.log(this.password);
    this.loggedIn = true;
    this.navigateToHome();
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

  navigateToHome() {
    this.router.navigate(['/home'], { state: { email: this.email, loggedIn: true } });
  }
}

export enum AuthenticatorState {
  Login,
  SignUp,
  ForgotPassword
}
