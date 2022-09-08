import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/web/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.getUserId())
    if (this.authService.getUserId() !== null){
      this.loggedIn = true
    }
  }

  onLogout() {
    this.authService.logout()
  }
}
