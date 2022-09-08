import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../../services/list/list.service";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  inputModel: any = "";

  constructor(private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  editList(title: string) {
    this.route.params.subscribe(params=>{
      this.listService.editList(title, params['listId']).subscribe(()=>{
        console.log("Successful edit list " + params['listId'])
      })
    })
  }
}
