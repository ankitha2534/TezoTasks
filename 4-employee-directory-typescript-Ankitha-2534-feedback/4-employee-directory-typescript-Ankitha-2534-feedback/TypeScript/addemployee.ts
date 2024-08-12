//Local Storage data storing and retreiving

var employeesJSON=localStorage.getItem('employees');
var employees=employeesJSON ? JSON.parse(employeesJSON) : [];
var rolesJSON = localStorage.getItem('roles');
var roles= rolesJSON ? JSON.parse(rolesJSON) : [];
let statusVal : number=0;

import {employeeData} from './employeeRoleData';

//Showing current date in placeholder for date of joining

const dateInput: HTMLInputElement | null = document.getElementById('doj') as HTMLInputElement;
if (dateInput) {
    dateInput.value = formatDate();

    // Add event listener to the date input to check validity on change
    dateInput.addEventListener('change', function(event) {
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        
        if (selectedDate >= currentDate) {
            let doj=(document.getElementById('doj') as HTMLInputElement);
            let fieldRequired=(document.getElementById('field-required5') as HTMLInputElement);
            inputValidation(doj,fieldRequired);
            dateInput.value = formatDate(currentDate); // Reset to current date
        }
    });
}

function addZero(num: any) {
    return num.toString().padStart(2, '0');
}

function formatDate(date: Date = new Date()) {
    return [
        date.getFullYear(),
        addZero(date.getMonth() + 1),
        addZero(date.getDate()),
    ].join('-');
}


function addEmp(event: Event): void {
    event.preventDefault();
    const profileImg: string = document.getElementById('fileProfileImage')?.getAttribute('src') || "Images/profile-user.png";
    const empNo: string = (document.getElementById('empNum') as HTMLInputElement).value;
    const firstName: string = (document.getElementById('fname') as HTMLInputElement).value;
    const lastName: string = (document.getElementById('lname') as HTMLInputElement).value;
    const dob: string = (document.getElementById('dob') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const mobileNumber: string = (document.getElementById('mobNum') as HTMLInputElement).value;
    const joinDate: string = (document.getElementById('doj') as HTMLInputElement).value;
    const location: string = (document.getElementById('location') as HTMLInputElement).value;
    const role: string = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const department: string = (document.getElementById('jobDept') as HTMLInputElement).value;
    const manager: string = (document.getElementById('manager') as HTMLInputElement).value;
    const project: string = (document.getElementById('project') as HTMLInputElement).value;
    let status: string = '';
    if (statusVal === 0) {
        status = "Active";
        statusVal = 1;
    } else {
        status = "InActive";
        statusVal = 0;
    }
    let empNoUnique=0;
    for(let i=0;i<employees.length;i++){
        if(employees[i].empNo==empNo){
            empNoUnique=1;
        }
    }
    validateForm(empNo,firstName,lastName,email,joinDate,mobileNumber);
    let patternName: RegExp = /(\s)*([A-Z][a-z]+|[A-Z])/i;
    let pattern: RegExp = /((([a-z]+)|([a-z]+[0-9]+))@([a-z]+).([a-z]+))/i;
    let patternDate: RegExp=/^((\d\d\d\d)-(\d\d)-(\d\d))/i;
    if ((empNo !== "" && empNoUnique!=1) && (firstName !== "" && firstName.match(patternName)) && (lastName !== "" && lastName.match(patternName)) && (email !== "" && email.match(pattern)) && (joinDate !== "" && joinDate.match(patternDate)) ) {
        const employee : employeeData = {
            profileImg, empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, role, department, manager, project, status
        };

        employees.push(employee);
        const alertBoxAdded: HTMLElement | null = document.querySelector('.alert-box-added');
        if (alertBoxAdded) {
            alertBoxAdded.style.display = "block";
            setTimeout(function () {
                alertBoxAdded.style.display = "none";
            }, 1000);
        }
        profileInput.src="Images/profile-user.png";
        localStorage.setItem('employees', JSON.stringify(employees));
        localStorage.setItem('roles', JSON.stringify(roles));
        (document.getElementById('employee-form') as HTMLFormElement)?.reset();
    }
}


//Form validation for required fields

function validateForm(empNo : string,firstName : string,lastName : string,email : string,joinDate : string,mobileNumber : string){
    let patternName: RegExp = /(\s)*([A-Z][a-z]+|[A-Z])/i;
    let pattern: RegExp = /((([a-z]+)|([a-z]+[0-9]+))@([a-z]+).([a-z]+))/i;
    let patternDate: RegExp=/^((\d\d\d\d)-(\d\d)-(\d\d))/i;
    let empNoUnique=0;
    for(let i=0;i<employees.length;i++){
        if(employees[i].empNo==empNo){
            empNoUnique=1;
        }
    }
    if(empNo=="" || empNoUnique==1){
        let empNum=(document.getElementById('empNum') as HTMLInputElement);
        let fieldRequired=(document.getElementById('field-required1') as HTMLInputElement);
        inputValidation(empNum,fieldRequired);
    }
    if(firstName=="" || !firstName.match(patternName)){
        console.log("Fname");
        let fname=(document.getElementById('fname') as HTMLInputElement);
        let fieldRequired=(document.getElementById('field-required2') as HTMLInputElement);
        inputValidation(fname,fieldRequired);
    }
    if(lastName=="" || !lastName.match(patternName)){
        let lname=(document.getElementById('lname') as HTMLInputElement);
        let fieldRequired=(document.getElementById('field-required3') as HTMLInputElement);
        inputValidation(lname,fieldRequired);
    }
    // if(mobileNumber.length!=10){
    //     let mobNum=(document.getElementById('mobNum') as HTMLInputElement);
    //     let fieldRequired=(document.getElementById('field-required6') as HTMLInputElement);
    //     inputValidation(mobNum,fieldRequired);
    // }
    if(email=="" || !email.match(pattern)){
        let mail=(document.getElementById('email') as HTMLInputElement);
        let fieldRequired=(document.getElementById('field-required4') as HTMLInputElement);
        inputValidation(mail,fieldRequired);
    }
    if(joinDate=="" || !joinDate.match(patternDate)){
        let doj=(document.getElementById('doj') as HTMLInputElement);
        let fieldRequired=(document.getElementById('field-required5') as HTMLInputElement);
        inputValidation(doj,fieldRequired);
    }
}

function inputValidation(inputField : HTMLInputElement,fieldRequired : HTMLInputElement){
    inputField.classList.add('active');
    fieldRequired.classList.add('active');
    inputField.addEventListener('input',function(){
        if(this.value.length>=0){
            inputField.classList.remove('active');
            fieldRequired.classList.remove('active');
        }
    })
}

function validateDOB(){
    const dob: string = (document.getElementById('dob') as HTMLInputElement).value;
    let patternDate: RegExp=/^((\d\d\d\d)-(\d\d)-(\d\d))/i;
    if(!dob.match(patternDate)){
        let dateOfBirth=(document.getElementById('dob') as HTMLInputElement);
        let fieldRequired=(document.getElementById('field-required7') as HTMLInputElement);
        inputValidation(dateOfBirth,fieldRequired);
    }
}
function validMobileNo(){
    const mobileNumber = (document.getElementById('mobNum') as HTMLInputElement);
    if(mobileNumber.value){
        if(mobileNumber.value.length !== 10){
            (document.getElementById('mobNum') as HTMLInputElement).classList.add('active');
            (document.getElementById('field-required6') as HTMLInputElement).classList.add('active');
        }
        if(mobileNumber.value.length == 10){
            (document.getElementById('mobNum') as HTMLInputElement).classList.remove('active');
            (document.getElementById('field-required6') as HTMLInputElement).classList.remove('active');
        }
    }
}

// Access Image

document.getElementById('profileBtn')?.addEventListener('click',function(){
    (document.getElementById('profileInput') as HTMLInputElement).click();
});

const fileInput = (document.getElementById('profileInput') as HTMLInputElement);
const profileInput=(document.getElementById('fileProfileImage') as HTMLInputElement);
let profileImgSrc : string | ArrayBuffer | null;
fileInput?.addEventListener('change', function(this: HTMLInputElement,event:Event) {
    // const file = this.files[0]; 
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function (e:Event) {
            profileImgSrc = (e.target as FileReader)?.result as string ?? "";
            profileInput.setAttribute('src', profileImgSrc);
        }
        reader.readAsDataURL(file); 
    }
});


// Edit employee Details

document?.addEventListener('DOMContentLoaded', function() {
    var a =new URLSearchParams(window.location.search);
    let editEmpNo=a.get("empId");
    employees.filter((employee : employeeData)=>{
        if(employee.empNo==editEmpNo){
            document.querySelector('.btn-3')?(document.querySelector('.btn-3') as HTMLInputElement).style.display="block":"";
            document.querySelector('.btn-2')?(document.querySelector('.btn-2') as HTMLInputElement).style.display="none":"";
            document.getElementById('fileProfileImage')?(document.getElementById('fileProfileImage') as HTMLImageElement).src= employee.profileImg :"";
            document.getElementById('empNum')?(document.getElementById('empNum') as HTMLInputElement).value=employee.empNo:"";
            document.getElementById('fname')?(document.getElementById('fname') as HTMLInputElement).value=employee.firstName:"";
            document.getElementById('lname')?(document.getElementById('lname') as HTMLInputElement).value=employee.lastName:"";
            document.getElementById('dob')?(document.getElementById('dob') as HTMLInputElement).value=employee.dob:"";
            document.getElementById('email')?(document.getElementById('email') as HTMLInputElement).value=employee.email:"";
            document.getElementById('mobNum')?(document.getElementById('mobNum') as HTMLInputElement).value=employee.mobileNumber:"";
            document.getElementById('doj')?(document.getElementById('doj') as HTMLInputElement).value=employee.joinDate:"";
            document.getElementById('location')?(document.getElementById('location') as HTMLInputElement).value=employee.location:"";
            document.getElementById('jobTitle')?(document.getElementById('jobTitle') as HTMLInputElement).value=employee.role:"";
            document.getElementById('jobDept')?(document.getElementById('jobDept') as HTMLInputElement).value=employee.department:"";
            document.getElementById('manager')?(document.getElementById('manager') as HTMLInputElement).value=employee.manager:"";
            document.getElementById('project')?(document.getElementById('project') as HTMLInputElement).value=employee.project:"";
        }
    })
    
});

function editEmp(){
    var a =new URLSearchParams(window.location.search);
    let editEmpNo=a.get("empId");
    employees.filter((employee : employeeData)=>{
        if(employee.empNo==editEmpNo){
            employee.profileImg = (document.getElementById('fileProfileImage') as HTMLImageElement).getAttribute('src')!;
            employee.empNo = (document.getElementById('empNum') as HTMLInputElement).value;
            employee.firstName = (document.getElementById('fname') as HTMLInputElement).value;
            employee.lastName = (document.getElementById('lname') as HTMLInputElement).value;
            employee.dob = (document.getElementById('dob') as HTMLInputElement).value;
            employee.email = (document.getElementById('email') as HTMLInputElement).value;
            employee.mobileNumber = (document.getElementById('mobNum') as HTMLInputElement).value;
            employee.joinDate = (document.getElementById('doj') as HTMLInputElement).value;
            employee.location = (document.getElementById('location') as HTMLInputElement).value;
            employee.role = (document.getElementById('jobTitle') as HTMLInputElement).value;
            employee.department = (document.getElementById('jobDept') as HTMLInputElement).value;
            employee.manager = (document.getElementById('manager') as HTMLInputElement).value;
            employee.project = (document.getElementById('project') as HTMLInputElement).value;
        }
    })
    localStorage.setItem('employees',JSON.stringify(employees));
    profileInput.src="Images/profile-user.png"; 
    window.location.href = 'employee.html';  
}

// Cancel event

function cancelEvent(){
    window.location.href = 'http://127.0.0.1:5500/employee.html';
}

