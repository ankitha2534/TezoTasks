import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ContentDashboardComponent } from './content-dashboard/content-dashboard.component';

export const routes: Routes = [
    {path:'content-dashboard',component:ContentDashboardComponent},
    {path:'add-employee',component:AddEmployeeComponent},
    {path:'',redirectTo:'',pathMatch:'full'}
];
