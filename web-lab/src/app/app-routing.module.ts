import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskViewComponent} from "./components/task-manager/task-view/task-view.component";
import {NewListComponent} from "./components/task-manager/new-list/new-list.component";
import {NewTaskComponent} from "./components/task-manager/new-task/new-task.component";
import {EditTaskComponent} from "./components/task-manager/edit-task/edit-task.component";
import {EditListComponent} from "./components/task-manager/edit-list/edit-list.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {SignupPageComponent} from "./components/signup-page/signup-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch: "full"},
  {path: 'new-list', component: NewListComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'lists/:listId/:taskId/edit', component: EditTaskComponent},
  {path: 'lists/:listId/new-task', component:NewTaskComponent},
  {path: 'lists/:listId/edit', component: EditListComponent},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId', component: TaskViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
