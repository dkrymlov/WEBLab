import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  inputModel: any = "";

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  editList(title: string) {
    this.route.params.subscribe(params=>{
      this.taskService.editList(title, params['listId']).subscribe(()=>{
        console.log("Successful edit list " + params['listId'])
      })
    })
  }
}
