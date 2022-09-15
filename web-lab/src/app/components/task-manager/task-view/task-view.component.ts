import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {ListService} from "../../../services/list/list.service";
import {SocketsService} from "../../../services/web/sockets.service";
import {AuthService} from "../../../services/web/auth.service";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnDestroy {

  lists: any;
  tasks: any;
  selectedListId: string = ""

  isTaskBtnVisible: boolean = false

  constructor(private authService: AuthService,
              private listService:ListService,
              private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private socketsService: SocketsService) {}

  ngOnInit() {
    //connect a new socket
    this.socketsService.connect(this.authService.getUserId())

    this.lists = undefined

    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.isTaskBtnVisible = true
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
              this.tasks = tasks;
              console.log(tasks)
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.listService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })

    //on task and list changes via socket event
    this.socketsService.socket.on('taskChange', (message:string)=>{
      setTimeout(()=>{
        this.route.params.subscribe(
          (params: Params) => {
            if (params['listId']) {
              this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
                this.tasks = tasks;
              })
            }
          }
        )
        //timeout for changes because of speed
      }, 100)
    })
    this.socketsService.socket.on('listChange', (message:string)=>{
      setTimeout(()=>{
        this.listService.getLists().subscribe((lists: any) => {
          this.lists = lists;
          console.log(lists)
        })
      }, 100)
      console.log(message)
    })
  }

  ngOnDestroy() {
    this.socketsService.disconnect()
    this.tasks = undefined
    this.lists = undefined
  }

  onTaskClick(task: any) {
    if (task.completed){
      this.taskService.uncompleteTask(task).subscribe(()=>{
        console.log("UnCompleted! " + task._id)
        task.completed = false
      })
    }else {
      this.taskService.completeTask(task).subscribe(()=>{
        console.log("Completed! " + task._id)
        task.completed = true
      })
    }
    this.socketsService.socket.emit('taskChanges', {userId: this.authService.getUserId()})
  }

  deleteTask(_id: string, _listId: string) {
    this.taskService.deleteTask(_id, _listId).subscribe(()=>{
      console.log("Delete task " + _id + "from " + _listId + " successful! ")
    })
    setTimeout(()=>{
      this.ngOnInit()
    }, 100)
    this.socketsService.socket.emit('taskChanges', {userId: this.authService.getUserId()})
  }

  deleteList(_listId: string) {
      this.listService.deleteList(_listId).subscribe(()=>{
        console.log("Delete list " + _listId + " successful!")
      })
      this.socketsService.socket.emit('listChanges', {userId: this.authService.getUserId()})
    setTimeout(()=>{
      this.ngOnInit()
    }, 100)
  }

  drop($event: CdkDragDrop<string[]>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
      console.log($event.container.data)
    }else {
      transferArrayItem($event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex);
    }
  }

}
