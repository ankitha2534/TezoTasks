import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPanelComponent } from './navigation-panel.component';

describe('NavigationPanelComponent', () => {
  let component: NavigationPanelComponent;
  let fixture: ComponentFixture<NavigationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
