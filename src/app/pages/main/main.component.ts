import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private router: Router, private userService: DataService) { }
  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
  }
}
