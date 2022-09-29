import { Component, OnInit } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {AuthService} from "../../services/web/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  password: string = '';
  email: string = '';
  badRequest: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignUp(email: string, password: string) {
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>)=>{
      console.log(res)
      if (res.status !== 400) {
        this.email = ''
        this.password = ''
        this.router.navigate(['/login'])
      }
    })
    setTimeout(()=>{
      this.badRequest = true
    }, 100)
    }
}
