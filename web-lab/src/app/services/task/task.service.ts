import { Injectable } from '@angular/core';
import {WebRequestService} from "../web/web-request.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createTask(title: string, _listId: string) {
    return this.webRequestService.post(`todo/lists/${_listId}/tasks`, {title, _listId})
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`todo/lists/${listId}/tasks`)
  }

  completeTask(task: any){
    return this.webRequestService.patch(`todo/lists/${task._listId}/tasks/${task._id}`, {completed: true})
  }

  uncompleteTask(task: any){
    return this.webRequestService.patch(`todo/lists/${task._listId}/tasks/${task._id}`, {completed: false})
  }

  deleteTask(_id: string, _listId: string) {
    return this.webRequestService.delete(`todo/lists/${_listId}/tasks/${_id}`)
  }

  editTask(title: string, _id: string, _listId: string){
    return this.webRequestService.patch(`todo/lists/${_listId}/tasks/${_id}`, {title: title})
  }

}
