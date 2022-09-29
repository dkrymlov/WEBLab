import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../../services/list/list.service";
import {SocketsService} from "../../../services/web/sockets.service";
import {AuthService} from "../../../services/web/auth.service";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit, OnDestroy {

  inputModel: any = "";

  constructor(private authService: AuthService, private socketsService: SocketsService, private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{

  }

  editList(title: string) {
    this.route.params.subscribe(params=>{
      this.listService.editList(title, params['listId']).subscribe(()=>{
        console.log("Successful edit list " + params['listId'])
        this.socketsService.socket.emit('listChanges', {userId: this.authService.getUserId()})
      })
    })
  }
}
