import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ToDoListService } from '../../../../core/services/to-do-list.service';
import { TaskView } from '../../../../core/models/task-view';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnChanges {
  @Input() showModal: boolean = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Input() task: TaskView | null = null;
  @Output() onTaskAdded = new EventEmitter<any>();
  taskView: TaskView = new TaskView();
  taskDescription: string = '';
  tasks : any=[];

  constructor(private service: ToDoListService, private route: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskView = { ...this.task };
    }
  }

  onSave() {
    if(this.taskView.taskDescription!="" && this.taskView.taskTitle!=""){
    if (this.taskView.taskId) {
      this.service.updateTask(this.taskView, this.taskView.taskId).subscribe(task => {
        this.closeModal();
        window.alert('Task edited successful!');
        if(this.route.url==='/side-bar/dashboard'){
          window.location.reload();
        }
        else{
          this.route.navigate(['/side-bar/dashboard']);
        }
        this.loadAllTasks();
      });
    } else {      
        this.service.addTask(this.taskView).subscribe(task => {
          this.taskDescription = '';
          this.closeModal();
          window.alert('Task added successfully!');
          if(this.route.url==='/side-bar/dashboard'){
            window.location.reload();
          }
          else{
            this.route.navigate(['/side-bar/dashboard']);
          }          
    
          this.loadAllTasks();
        });
      }
      
    }
    else{
      window.alert('Please fill both Task Title and Task Description!');
    }
  } 

  loadAllTasks(){
    var observable=this.service.getTasksByUserId();
    observable.subscribe(response=>{
      if(response.isSuccess && response.data){
        this.tasks=response.data;
        this.service.dataUpdated = response.data;
      }
    })
  }

  openModal() {
    this.showModal = true;
    this.showModalChange.emit(this.showModal);
  }

  closeModal() {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }
}
