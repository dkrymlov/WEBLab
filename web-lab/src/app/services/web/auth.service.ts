import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {WebRequestService} from "./web-request.service";
import {shareReplay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private webRequestService: WebRequestService) { }

  signup(email: string, password: string) {
    return this.webRequestService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        AuthService.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

  login(email:string, password: string){
    return this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>)=>{
          AuthService.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'))
          console.log("LOGGED IN")
          console.log(res)
      })
    )
  }

  logout(){
    AuthService.removeSession()
    console.log("LOGGED OUT")
    this.router.navigate(['../login']).then(r => {

    });
  }

  private static setSession(userId: string, accessToken: string | null, refreshToken: string | null){
    localStorage.setItem('user-id', userId)
    if (typeof accessToken === "string") {
      localStorage.setItem('x-access-token', accessToken)
    }
    if (typeof refreshToken === "string") {
      localStorage.setItem('x-refresh-token', refreshToken)
    }
  }

  static removeSession(){
    localStorage.removeItem('user-id')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-refresh-token')
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string | null) {
    if (typeof accessToken === "string") {
      localStorage.setItem('x-access-token', accessToken)
    }
  }

  httpOptions : Object = {
    headers: {
      'x-refresh-token': this.getRefreshToken(),
      '_id': this.getUserId()
    }, observe: "response"
  }

  getNewAccessToken() {
    return this.http.get(`${this.webRequestService.ROOT_URL}/users/me/access-token`, this.httpOptions)
      .pipe(
        tap((res:HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'));
        })
      )}

}
