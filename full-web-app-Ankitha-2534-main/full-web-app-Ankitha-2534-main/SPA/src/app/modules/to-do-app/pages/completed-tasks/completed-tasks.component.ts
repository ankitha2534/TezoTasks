import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListService } from '../../../../core/services/to-do-list.service';
import { UserTask } from '../../../../core/models/user-task';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent implements OnInit{
  completedTasks : any[] = [];
  userTask : UserTask = new UserTask();
  currentDate : Date = new Date();
  showTaskBlock : number|null = null;

  constructor(private service : ToDoListService,private route : Router){}

  ngOnInit(): void {
    this.completed();
  }

  signOut(){
    localStorage.removeItem('Token');
    window.alert('Signing out');
    this.route.navigate(['/sign-in']);
  }

  completed(){
      var observable=this.service.CompletedTasks();
      observable.subscribe(response=>{
        if(response.isSuccess && response.data){
          this.completedTasks=response.data;
        }
    });
  }

  deleteTaskById(taskId : number){
    if(confirm('Task Deleted successful!')){
      this.service.deleteTask(taskId).subscribe(response=>{
        this.completed();
        window.alert('Task Deleted successful!');
      })
    }    
  }

  showDiv(index : number){
    this.showTaskBlock = this.showTaskBlock === index ? null : index;
  }

  getTimeDifference(taskDate: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(taskDate).getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} months ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} years ago`;
    }
  }
}
