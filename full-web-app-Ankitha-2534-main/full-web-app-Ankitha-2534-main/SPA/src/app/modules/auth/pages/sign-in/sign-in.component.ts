import { Component } from '@angular/core';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { LoginRequest } from '../../../../core/models/login-request';
import { FormControl, FormsModule,ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { ToDoListService } from '../../../../core/services/to-do-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
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

  onSignIn() {
    this.isCredentials=true;
    this.service.authenticateUser(this.loginRequest).subscribe(response => {
      localStorage.setItem('Username',this.loginRequest.UserName);
      if(response.isSuccess && response.token){
        const token = response.token;
        console.log(token);
        localStorage.setItem('Token',token);
        window.alert('Login Successful!');
        this.router.navigate(['/side-bar/dashboard']);
      } 
      else{
        window.alert(response.message);
      }     
    });
  }

  hidePassword(){
    this.isHide = !this.isHide;
  }

}
