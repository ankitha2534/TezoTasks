// services.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeManagementAPIServiceService {
  private apiUrl = 'https://localhost:7120/api/Employee'; 

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<EmployeeView[]> {
    return this.http.get<EmployeeView[]>(`${this.apiUrl}/GetAllEmployees`);
  }

  filterByAlphabet(letter : string): Observable<EmployeeView[]>{
    return this.http.get<EmployeeView[]>(`${this.apiUrl}/FilterByAlphabet/${letter}`);
  }
}

export interface EmployeeView{
  id : number,
  uid : number,
  firstName : number,
  lastName : number,
  dateOfBirth : Date,
  email : string,
  mobileNumber : string,
  joinDate : Date,
  jobTitle : string,
  location : string,
  department : string,
  manager : string,
  project : string

}
