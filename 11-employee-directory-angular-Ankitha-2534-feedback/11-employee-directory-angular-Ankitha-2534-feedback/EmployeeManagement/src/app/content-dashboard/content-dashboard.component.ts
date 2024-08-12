import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeManagementAPIServiceService, EmployeeView } from '../employee-management-apiservice.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.css']
})
export class ContentDashboardComponent implements OnInit {
  alphabet: string[] = [];
  employees: EmployeeView[] = [];
  previousButton: HTMLButtonElement | null = null;
  previousLetter : string = "";
  alphabetState: boolean[] = Array(26).fill(false);
  status : string[]=['Active','In-Active'];
  isVisible : boolean =false;

  constructor(private apiService: EmployeeManagementAPIServiceService,private router:Router) { }

  ngOnInit(): void {
    for (let i = 65; i <= 90; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
    this.DisplayAlphabet();
  }
  
  DisplayAlphabet(){
    this.apiService.getEmployees().subscribe(data =>{
      this.employees=data;
      console.log(data);
    })
  }
  Status(){
    console.log(this.status);
  }

  ShowDropdown(){
    this.isVisible = true;
    this.Status();
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.multiselect-container') && !targetElement.closest('.filter-input')) {
      this.isVisible = false;
    }
  }

  AddEmployee(){
    this.router.navigate(['/add-employee']);
  }
  FilterByAlphabet(event : Event,letter : string){
    const button = event.target as HTMLButtonElement;
    button.style.backgroundColor = '#F44848';
    button.style.color = '#ffffff';
    this.alphabetState[letter.charCodeAt(0)-65] = true;
    if (this.previousButton && this.previousButton !== button && this.previousLetter && this.previousLetter!==letter) {
      this.previousButton.style.backgroundColor = '';
      this.previousButton.style.color = '#9EA8B6';
      this.alphabetState[this.previousLetter.charCodeAt(0)-65] = false;
    }
    if(this.previousButton == button){
      this.DisplayAlphabet();
      this.previousButton.style.backgroundColor = '';
      this.previousButton.style.color = '#9EA8B6';
    }
    this.previousButton = button;
    this.previousLetter = letter;
    this.apiService.filterByAlphabet(letter).subscribe(data=>{
      this.employees=data;
    })
  }

  
}
