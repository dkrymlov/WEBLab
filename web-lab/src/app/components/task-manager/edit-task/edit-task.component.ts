import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  listId: string = ""
  inputModel: any = "";

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  editTask(title: string) {
    console.log(title)
    this.route.params.subscribe(params =>{
      this.listId = params['listId']
      this.taskService.editTask(title, params['taskId'], params['listId']).subscribe(()=>{
        console.log("Edit successful")
      })
    })
  }
}
