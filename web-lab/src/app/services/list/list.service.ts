import { Injectable } from '@angular/core';
import {WebRequestService} from "../web/web-request.service";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: string){
    return this.webRequestService.post('lists', {title});
  }

  getLists() {
    return this.webRequestService.get('lists')
  }

  deleteList(_listId: string) {
    return this.webRequestService.delete(`lists/${_listId}`)
  }

  editList(title: string, _listId: string) {
    return this.webRequestService.patch(`lists/${_listId}`, {title: title})
  }
}
