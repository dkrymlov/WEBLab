import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskViewComponent} from "./components/task-manager/task-view/task-view.component";
import {NewListComponent} from "./components/task-manager/new-list/new-list.component";
import {NewTaskComponent} from "./components/task-manager/new-task/new-task.component";

const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch: "full"},
  {path: 'new-list', component: NewListComponent},
  {path: 'lists/:listId/new-task', component:NewTaskComponent},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId', component: TaskViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
