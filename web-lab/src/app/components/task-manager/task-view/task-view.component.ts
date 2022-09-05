import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;
  selectedListId: string = ""

  isTaskBtnVisible: boolean = false

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.isTaskBtnVisible = true
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
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
  }

  deleteTask(_id: string, _listId: string) {
    this.taskService.deleteTask(_id, _listId).subscribe(()=>{
      console.log("Delete task " + _id + "from " + _listId + " successful! ")
    })
    window.location.reload()
  }

  deleteList(_listId: string) {
      this.taskService.deleteList(_listId).subscribe(()=>{
        console.log("Delete list " + _listId + " successful!")
      })
    window.location.reload()
  }
}
