import { Component,Input } from '@angular/core';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [AddTaskComponent,RouterOutlet,RouterModule,CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  isModalOpen : boolean = false;
  storedFunction: (() => void) | undefined;  

  constructor(private route:Router){}
  signOut(){
    localStorage.removeItem('Token');
    this.route.navigate(['/sign-in']);
  }

  openAddTaskModal()
  {
    this.isModalOpen = true;
  }

  updateModalChange(modalChange : boolean){
    this.isModalOpen = modalChange;
  }

  onSelect(event : Event){
    var url = event.target as HTMLSelectElement;
    var link=url.value;
    console.log(link);
    this.route.navigateByUrl(link);
  }
  
}
