import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { SearchPortalComponent } from './search-portal/search-portal.component';
import { ContentDashboardComponent } from './content-dashboard/content-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, NavigationPanelComponent, SearchPortalComponent, ContentDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeManagement';
}
