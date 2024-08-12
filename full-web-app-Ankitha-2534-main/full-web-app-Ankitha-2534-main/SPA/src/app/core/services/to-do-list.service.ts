import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskView } from '../models/task-view';
import { TaskStatus } from '../models/task-status';
import { UserTask } from '../models/user-task';
import { ApiResponse } from '../models/api-response';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private baseApiEndPoint = "https://localhost:7060/api"

  dataUpdated : any=[];

  constructor(private http: HttpClient) { }


  getTasksByUserId(): Observable<ApiResponse<TaskView[]>> {
    let url = `${this.baseApiEndPoint}/ToDoTask/userId`;
    return this.http.get<ApiResponse<TaskView[]>>(url);
  }

  addTask(taskView: TaskView) {
    let url = `${this.baseApiEndPoint}/ToDoTask`;
    return this.http.post(url, taskView);
  }
  
  updateTaskStatus(taskId: number) {
    let url = `${this.baseApiEndPoint}/ToDoTask/Status/${taskId}`;
    return this.http.patch(url,{});
  }

  updateTask(taskView : TaskView,taskId : number){
    let url = `${this.baseApiEndPoint}/ToDoTask/UpdateTaskDetails/${taskId}`;
    return this.http.put(url, taskView);
  }

  ActiveTasks(): Observable<ApiResponse<TaskView[]>>{
    let url = `${this.baseApiEndPoint}/ToDoTask/ActiveTasks`;
    return this.http.get<ApiResponse<TaskView[]>>(url);
  }

  CompletedTasks(): Observable<ApiResponse<TaskView[]>>{
    let url = `${this.baseApiEndPoint}/ToDoTask/CompletedTasks`;
    return this.http.get<ApiResponse<TaskView[]>>(url);
  }

  deleteTask(taskId : number){
    let url = `${this.baseApiEndPoint}/ToDoTask/${taskId}`;
    return this.http.delete(url);
  }

  deleteAllTasks(): Observable<any> {
    const url = `${this.baseApiEndPoint}/ToDoTask/Tasks`;
    return this.http.delete(url);
  }

  addUser(loginRequest : LoginRequest){
    let url = `${this.baseApiEndPoint}/User/AddUser`;
    return this.http.post(url,loginRequest)
  }

  authenticateUser(loginRequest : LoginRequest):Observable<ApiResponse<string>>{
    const url = `${this.baseApiEndPoint}/Auth`;
    return this.http.post<ApiResponse<string>>(url,loginRequest);
  }  
}
