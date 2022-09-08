import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  listId: string = ""
  taskId: string = ""
  inputModel: any = "";

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

  }

  editTask(title: string) {
    console.log(title)
    this.route.params.subscribe(params =>{
      console.log(params)
      this.listId = params['listId']
      this.taskId = params['taskId']
      this.taskService.editTask(title, this.taskId, this.listId).subscribe(()=>{
        console.log("Edit successful")
      })
    })
  }
}
