import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-panel',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './navigation-panel.component.html',
  styleUrl: './navigation-panel.component.css'
})
export class NavigationPanelComponent {

}
