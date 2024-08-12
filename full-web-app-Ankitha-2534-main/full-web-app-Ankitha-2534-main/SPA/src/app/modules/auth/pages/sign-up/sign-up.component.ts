import { Component } from '@angular/core';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { LoginRequest } from '../../../../core/models/login-request';
import { ToDoListService } from '../../../../core/services/to-do-list.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule,ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  isHide:boolean = true;
  loginRequest: LoginRequest = new LoginRequest();
  isCredentials : boolean = false;


  constructor(private service : ToDoListService,private router : Router){}

  Credentials = new FormGroup(
    {
      UserName:new FormControl('',[Validators.required,Validators.minLength(5)]),
      Password:new FormControl('',[Validators.required])
    }
  );

  onSignUp() {
    this.isCredentials=true;
    this.service.addUser(this.loginRequest).subscribe({
      next : response => {
        if(this.loginRequest.Password!="" && this.loginRequest.UserName!=""){
          window.alert('Signup Successful!');
          this.router.navigate(['/sign-in']);
        }
      
    }});
  }

  hidePassword(){
    this.isHide = !this.isHide;
  }
}
