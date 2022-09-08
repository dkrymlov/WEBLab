import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task/task.service";
import {AuthService} from "../../services/web/auth.service";
import {HttpResponse} from "@angular/common/http";
import {TaskViewComponent} from "../task-manager/task-view/task-view.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email: string = '';
  password: string = '';
  badRequest: boolean = false

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.badRequest = false
  }

  onLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>)=>{
      console.log(res)
      //bad request status
      if (res.status !== 400) {
        this.email = ''
        this.password = ''
        this.router.navigate(['/todo/lists']);
        setTimeout(()=>{
          //window.location.reload()
        }, 1)
      }
    })
    setTimeout(()=>{
      this.badRequest = true
    }, 100)
  }
}
