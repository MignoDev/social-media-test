import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  email: string = "migelgames14@gmail.com";
  loggedIn: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
    this.email = history.state.email;
    this.loggedIn = !history.state.loggedIn;
  }
}
