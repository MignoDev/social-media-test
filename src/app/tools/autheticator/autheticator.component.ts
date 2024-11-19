import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { loginAuthentication } from '../../business/loginAuthentication';
import { perfilService } from '../../Service/perfilService/perfilService.service';
import { DropdownModule } from 'primeng/dropdown';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-autheticator',
  templateUrl: './autheticator.component.html',
  styleUrls: ['./autheticator.component.css']
})
export class AutheticatorComponent {
  state = AuthenticatorState.SignUp;
  @Input() user: User;
  public loggedIn: boolean = false;
  genders = Object.values(Gender);
  passwordConfirmation: string;

  constructor(private router: Router, private loginAuthentication: loginAuthentication, private perfilService: perfilService, private userService: DataService) {
    this.user = {
      id_perfil: null,
      nickname_perfil: null,
      nombre_perfil: "",
      apellido_perfil: "",
      descripcion_perfil: "",
      correo_perfil: "",
      password_perfil: "",
      fecha_nacimiento_perfil: new Date(),
      genero_perfil: null
    }
    this.passwordConfirmation = "";
  }



  async onLoginButtonClick() {
    // console.log(this.email);
    // console.log(this.password);
    const message = await this.loginAuthentication.Authenticationlogin(this.user.correo_perfil, this.user.password_perfil);
    if (message === 'Login successful') {
      this.navigateToHome();
    } else {
      alert(message);
    }
  }

  async onSignUpButtonClick() {
    if (this.isValidEmail(this.user.correo_perfil)) {
      if (this.user.password_perfil == this.passwordConfirmation) {
        try {
          console.log(this.user);
          await this.perfilService.createPerfil({ correo_perfil: this.user.correo_perfil, password_perfil: this.user.password_perfil, nombre_perfil: this.user.nombre_perfil, apellido_perfil: this.user.apellido_perfil, descripcion_perfil: this.user.descripcion_perfil, fecha_nacimiento_perfil: this.user.fecha_nacimiento_perfil, genero_perfil: this.user.genero_perfil });
          this.userService.setUser(this.user);
          this.navigateToHome
        } catch (e) {
          alert("Error creating account");
        }
      }
    }
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
    this.router.navigate(['/home'], { state: { email: this.user.correo_perfil, loggedIn: true } });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onGenderChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.user.genero_perfil = selectElement.value as Gender;
  }

}

interface User {
  id_perfil: number | null;
  nickname_perfil: string | null;
  nombre_perfil: string;
  apellido_perfil: string;
  descripcion_perfil: string;
  correo_perfil: string;
  password_perfil: string;
  fecha_nacimiento_perfil: Date;
  genero_perfil: Gender | null;
}

export enum Gender {
  male = "Masculino",
  femail = "Femenino",
  other = "Prefiero no decirlo",
}

export enum AuthenticatorState {
  Login,
  SignUp,
  ForgotPassword
}
