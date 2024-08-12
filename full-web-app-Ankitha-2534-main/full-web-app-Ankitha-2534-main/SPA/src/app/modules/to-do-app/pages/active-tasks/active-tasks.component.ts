import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListService } from '../../../../core/services/to-do-list.service';
import { UserTask } from '../../../../core/models/user-task';
import { TaskView } from '../../../../core/models/task-view';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-active-tasks',
  standalone: true,
  imports: [CommonModule,AddTaskComponent,RouterLink],
  templateUrl: './active-tasks.component.html',
  styleUrl: './active-tasks.component.css'
})
export class ActiveTasksComponent implements OnInit {
  activeTasks : TaskView[] = [];
  userTask : UserTask = new UserTask();
  currentDate : Date = new Date();
  taskView : TaskView =new TaskView();
  taskToUpdate: TaskView | null = null;
  updateTask : boolean = false;
  showTaskBlock : number|null = null;
  constructor(private service : ToDoListService,private route : Router){}

  ngOnInit(): void {
    this.active();
  }

  signOut(){
    localStorage.removeItem('Token');
    window.alert('Signing out');
    this.route.navigate(['/sign-in']);
  }

  active(){
      var observable=this.service.ActiveTasks();
      observable.subscribe(response=>{
        if(response.isSuccess && response.data){
          this.activeTasks=response.data;
        }
    });
  }

  onCheck(taskId:number){
    this.service.updateTaskStatus(taskId).subscribe(response => { 
      window.alert('Marked as task completed!');
        this.active(); 
    });
  }
  
  onEdit(task: TaskView) {
    this.taskToUpdate = { ...task }; 
    this.updateTask = true;
  }

  deleteTaskById(taskId : number){
    if(confirm('Task Deleted successful!'))
    {
      this.service.deleteTask(taskId).subscribe(response=>{
        this.active();      
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