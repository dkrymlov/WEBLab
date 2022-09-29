import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {io, Socket} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(private authService: AuthService) { }

  socket: any;

  connect(userId: string | null) {
    this.socket = io('http://localhost:3000');
    console.log(this.authService.getUserId())
  }

  disconnect(){
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  changes(){
    return new Observable((observer: any)=>{
      this.socket.on('changes', (message: string) => {
        console.log(message)
        observer.next(message);
      });
    });
  }

}
