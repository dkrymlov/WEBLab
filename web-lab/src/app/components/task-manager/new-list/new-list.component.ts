import { Component, OnInit } from '@angular/core';
import {ListService} from "../../../services/list/list.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  inputModel: any = "";

  constructor(private listService: ListService) { }

  ngOnInit(): void {
  }

  createList(title: string) {
    this.listService.createList(title).subscribe((response: any)=>{
      console.log(response)
    })
  }
}
