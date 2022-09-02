import { Component, OnInit } from '@angular/core';
import {TaskViewComponent} from "../task-view/task-view.component";
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  listId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
    console.log(this.listId)
  }

  createTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe((response: any)=>{
      console.log(response)
    })
  }
}
