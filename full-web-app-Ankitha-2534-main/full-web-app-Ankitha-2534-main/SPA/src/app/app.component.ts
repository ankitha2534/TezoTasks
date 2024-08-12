import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from './modules/auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './modules/auth/pages/sign-in/sign-in.component';
import { SideBarComponent } from './modules/to-do-app/components/side-bar/side-bar.component';
import { DashboardComponent } from './modules/to-do-app/pages/dashboard/dashboard.component';
import { CompletedTasksComponent } from './modules/to-do-app/pages/completed-tasks/completed-tasks.component';
import { ActiveTasksComponent } from './modules/to-do-app/pages/active-tasks/active-tasks.component';
import { AddTaskComponent } from './modules/to-do-app/components/add-task/add-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignUpComponent, SignInComponent, SideBarComponent, DashboardComponent, CompletedTasksComponent, ActiveTasksComponent, AddTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoTask';
}
