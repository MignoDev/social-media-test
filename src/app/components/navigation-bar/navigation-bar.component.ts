import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  @Input() loggedIn: boolean = true;
  loggedInState: boolean = true;
  username: string | null = this.data.getUser().nickname_perfil;

  constructor(private router: Router, private data: DataService) {
    this.loggedInState = this.data.isLoggedIn();
  }

  public goToProfile() {
    this.router.navigate(['/profile']);
  }

  public goToMain() {
    if (this.loggedInState) {
      this.router.navigate(['/home']);
    }
  }

  public logOut() {
    this.data.clearUser();
    this.data.clearFriends();
    this.router.navigate(['/']);
  }

}
