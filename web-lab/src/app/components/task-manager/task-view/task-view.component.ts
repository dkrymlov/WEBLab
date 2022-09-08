import {Component, OnInit, SimpleChanges} from '@angular/core';
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {ListService} from "../../../services/list/list.service";

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

  constructor(private listService:ListService, private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  ngOnInit() {
    this.lists = undefined
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.isTaskBtnVisible = true
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
              this.tasks = tasks;
            console.log(tasks)
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.listService.getLists().subscribe((lists: any) => {
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
    setTimeout(()=>{
      this.ngOnInit()
    }, 100)
  }

  deleteList(_listId: string) {
      this.listService.deleteList(_listId).subscribe(()=>{
        console.log("Delete list " + _listId + " successful!")
      })
    setTimeout(()=>{
      this.ngOnInit()
    }, 100)
  }

  drop($event: CdkDragDrop<string[]>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
      console.log($event.container.data)
    }else {
      transferArrayItem($event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex);
    }
  }
}
