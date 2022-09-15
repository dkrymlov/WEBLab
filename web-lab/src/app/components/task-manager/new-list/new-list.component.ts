import { Component, OnInit } from '@angular/core';
import {ListService} from "../../../services/list/list.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/web/auth.service";
import {SocketsService} from "../../../services/web/sockets.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  inputModel: any = "";
  userId: string | null = ''

  constructor(private socketService: SocketsService, private authService: AuthService, private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createList(title: string) {

    this.userId = this.authService.getUserId()

    this.listService.createList(title).subscribe((response: any)=>{
      console.log(response)
    })


  }
}
