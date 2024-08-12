import { Routes } from '@angular/router';
import { ActiveTasksComponent } from './modules/to-do-app/pages/active-tasks/active-tasks.component';
import { CompletedTasksComponent } from './modules/to-do-app/pages/completed-tasks/completed-tasks.component';
import { DashboardComponent } from './modules/to-do-app/pages/dashboard/dashboard.component';
import { SignInComponent } from './modules/auth/pages/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/pages/sign-up/sign-up.component';
import { SideBarComponent } from './modules/to-do-app/components/side-bar/side-bar.component';

export const routes: Routes = [
    {
        path: 'side-bar', component: SideBarComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'active-tasks', component: ActiveTasksComponent },
            { path: 'completed-tasks', component: CompletedTasksComponent },
        ]

    },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
];
