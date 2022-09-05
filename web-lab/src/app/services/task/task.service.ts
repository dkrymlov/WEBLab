import { Injectable } from '@angular/core';
import {WebRequestService} from "../web/web-request.service";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: string){
    return this.webRequestService.post('lists', {title});
  }

  getLists() {
    return this.webRequestService.get('lists')
  }

  createTask(title: string, _listId: string) {
    return this.webRequestService.post(`lists/${_listId}/tasks`, {title, _listId})
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`)
  }

  completeTask(task: any){
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {completed: true})
  }

  uncompleteTask(task: any){
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {completed: false})
  }

  deleteTask(_id: string, _listId: string) {
    return this.webRequestService.delete(`lists/${_listId}/tasks/${_id}`)
  }

  editTask(title: string, _id: string, _listId: string){
    return this.webRequestService.patch(`lists/${_listId}/tasks/${_id}`, {title: title})
  }

  deleteList(_listId: string) {
    return this.webRequestService.delete(`lists/${_listId}`)
  }

  editList(title: string, _listId: string) {
    return this.webRequestService.patch(`lists/${_listId}`, {title: title})
  }
}
