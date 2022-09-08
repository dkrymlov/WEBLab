import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './components/task-manager/task-view/task-view.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {NewListComponent} from "./components/task-manager/new-list/new-list.component";
import { NewTaskComponent } from './components/task-manager/new-task/new-task.component';
import { EditTaskComponent } from './components/task-manager/edit-task/edit-task.component';
import {FormsModule} from "@angular/forms";
import { EditListComponent } from './components/task-manager/edit-list/edit-list.component';
import { HeaderComponent } from './components/header/header.component';
import {WebReqInterceptor} from "./services/web/web-req.interceptor";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    LoginPageComponent,
    SignupPageComponent,
    NewListComponent,
    NewTaskComponent,
    EditTaskComponent,
    EditListComponent,
    HeaderComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatIconModule,
        HttpClientModule,
        FormsModule,
        DragDropModule,
        BrowserAnimationsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
