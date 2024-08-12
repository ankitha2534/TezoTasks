import { Component, EventEmitter, Output } from '@angular/core';
import { ToDoListService } from '../../../../core/services/to-do-list.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../../../core/models/task-status';
import { Router,RouterLink } from '@angular/router';
import { Token } from '@angular/compiler';
import { TaskView } from '../../../../core/models/task-view';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
    tasks : TaskView[]=[];
    taskStatus : TaskStatus =new TaskStatus();
    currentDate : Date = new Date();
    completedPercentage : number = 0;
    activePercentage : number = 0;
    totalTasks : number =0;
    completedTasks : number = 0;
    name : string | null= '';
       

  constructor(private service : ToDoListService,private route : Router){}

  ngOnInit(): void {
    if(localStorage.getItem('Username')){
      this.name=localStorage.getItem('Username');
    }
    console.log(this.name);
    this.loadTasks();
  }

  signOut(){
    localStorage.removeItem('Token');
    window.alert('Signing out');
    this.route.navigate(['/sign-in']);
  }

  loadTasks(){
    var observable=this.service.getTasksByUserId();
    observable.subscribe(response=>{
      if(response.isSuccess && response.data){
        this.tasks=response.data; 
      }
      this.totalTasks = this.tasks.length;
      if(this.totalTasks>0){
        this.completedTasks = this.tasks.filter(task => task.isDone).length; 
        this.completedPercentage = Math.round((this.completedTasks / this.totalTasks) * 100); 
        this.activePercentage = 100-this.completedPercentage; 
      }
    });
  }

  onUpdateTask(){
    this.loadTasks();
  }

  deleteAll(){
    if(confirm('Deleted all tasks')){
      this.service.deleteAllTasks().subscribe(response=>{
        this.loadTasks();
      });
    }    
  }

}
