import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SocketsService} from "../../../services/web/sockets.service";
import {AuthService} from "../../../services/web/auth.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnDestroy {

  listId: string = ""
  taskId: string = ""
  inputModel: any = "";

  constructor(private socketsService: SocketsService, private authService: AuthService, private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
  }

  editTask(title: string) {
    console.log(title)
    this.route.params.subscribe(params =>{
      console.log(params)
      this.listId = params['listId']
      this.taskId = params['taskId']
      this.taskService.editTask(title, this.taskId, this.listId).subscribe(()=>{
        this.socketsService.socket.emit('taskChanges', {userId: this.authService.getUserId()})
        console.log("Edit successful")
      })
    })
  }
}
