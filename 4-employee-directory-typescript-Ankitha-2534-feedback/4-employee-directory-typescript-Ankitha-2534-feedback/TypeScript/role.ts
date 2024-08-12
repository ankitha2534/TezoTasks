var employeesJSON=localStorage.getItem('employees');
var employees=employeesJSON ? JSON.parse(employeesJSON) : [];
var rolesJSON = localStorage.getItem('roles');
var roles= rolesJSON ? JSON.parse(rolesJSON) : [];

import { employeeData } from './employeeRoleData';
import {roleDataRow} from './employeeRoleData';

//--------------------------------------------ROLE PAGE---------------------------------------------------
let cnt=0;
var checkedRoleDetails : employeeData[];
var assignEmployees : employeeData[];
var departmentRole : string;
window.onload = () => {
   // ROLES
    let roleService=document.getElementById('service');
    roles.forEach((role : any)=>{
        const roleDivBlock=createRoleComponent(role);
        roleService?.appendChild(roleDivBlock);
    })
}

//Multi-select in new role page

document.querySelector('.search-employee')?.addEventListener('click',function(){
    let optionContainer=document.createElement('div');
    optionContainer.classList.add('option-container');
    if(cnt==0)(document.querySelector('.options-optioncontainer') as HTMLInputElement).innerHTML="";
    
    assignEmployees=employees.filter((employee: employeeData)=>{
        if(employee.department=="Not Assigned" && employee.role=="Not Assigned"){
            return employee;
        }
    })
    if(cnt==0){
        for(let i=0;i<assignEmployees.length;i++){
            let options=document.createElement('div');
            options.classList.add('options');
            options.setAttribute('onClick', 'checkRole(this,event)');
            let optionProfile=document.createElement('div');
            optionProfile.classList.add('option-profile');
            let profileImageRole=document.createElement('img');
            profileImageRole.src=assignEmployees[i].profileImg;
            profileImageRole.alt="Profile";
            let labelText=document.createElement('option');
            labelText.value=assignEmployees[i].firstName+" "+assignEmployees[i].lastName;
            labelText.textContent=assignEmployees[i].firstName+" "+assignEmployees[i].lastName;
            optionProfile.appendChild(profileImageRole);
            optionProfile.appendChild(labelText);
            options.appendChild(optionProfile);
            let checkBoxRole=document.createElement('input');
            checkBoxRole.setAttribute('type','checkbox');
            checkBoxRole.setAttribute('label','checkbox');
            checkBoxRole.classList.add('check-box-role');
            checkBoxRole.id=assignEmployees[i].empNo;
            options.appendChild(checkBoxRole); 
            document.querySelector('.options-optioncontainer')?.appendChild(options);       
        }
        let optionsOptionContainer=document.querySelector('.options-optioncontainer');
        const selectBox = document.querySelector('.select-box');
        if (selectBox) {
            selectBox.appendChild(optionsOptionContainer ?? document.createElement('div'));
        }
    }
})

var options :NodeListOf<HTMLElement> = document.querySelectorAll('.option');
var searchEmployeeRole = (document.querySelector('.search-employee') as HTMLInputElement);
var optionContainerRole = (document.querySelector('.options-optioncontainer') as HTMLInputElement);
var checkboxRole : NodeListOf<HTMLInputElement> = document.querySelectorAll('.check-box-role');
optionContainerRole?optionContainerRole.style.display = 'none':"";
document.querySelector('.search-employee')?.addEventListener('input', function (this: HTMLInputElement) {
    const searchValue : string = this.value.toLowerCase();
    document.querySelectorAll('.options').forEach((option : any) => {
        const text : string = option.textContent?.toLowerCase();
        if (text?.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });    
});


document.querySelector('.search-employee')?.addEventListener('click', function () {
    (document.querySelector('.select-search-role') as HTMLInputElement).style.border="2px solid #4C9AFF"
    optionContainerRole?optionContainerRole.style.display = 'block':"";    
});

document?.addEventListener('click', function (event:Event) {
    if (!searchEmployeeRole?.contains(event.target as HTMLElement) && !optionContainerRole?.contains(event.target as HTMLElement) && !(document.querySelector('.search-employee'))?.contains(event.target as HTMLElement)) {
        optionContainerRole?optionContainerRole.style.display = 'none':"";
        if(cnt==0)searchEmployeeRole? searchEmployeeRole.value="" : "";
        document.querySelector('.select-search-role')?(document.querySelector('.select-search-role') as HTMLInputElement).style.border="2px solid #DFE1E6":"";
    }
});


// Checked or not

function checkRole(element: any,event:Event){
    let check=element.querySelector('input[type="checkbox"]');
    if (!check.contains(event.target as HTMLElement)) {
        check.checked = !check.checked; 
        departmentRole=(document.getElementById('jobDept') as HTMLInputElement).value;
        if (check.checked) {
            cnt++;
            searchEmployeeRole.value = "Assigned Employees: " + cnt;
            checkedRoleDetails = assignEmployees.filter((employee:employeeData) => {
                if (check.id == employee.empNo) return employee;
            })
            for (let i = 0; i < assignEmployees.length; i++) {
                if (assignEmployees[i].empNo == check.id) {
                    assignEmployees.splice(i, 1);
                }
            }
        }
        else {
            cnt--;
            searchEmployeeRole.value = "Assigned Employees: " + cnt;
            for (let i = 0; i < checkedRoleDetails.length; i++) {
                if (checkedRoleDetails[i] == check.id) {
                    checkedRoleDetails.splice(i, 1);
                }
            }
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].empNo == check.id) {
                    assignEmployees.push(employees[i]);
                }
            }
        }
    }
}

//Add Role Page Local Storage

function addRole(){
    const newRole=(document.getElementById('add-new-role') as HTMLInputElement).value;
    departmentRole=(document.getElementById('jobDept') as HTMLInputElement).value;
    const description=(document.getElementById('description') as HTMLInputElement).value;
    const locationRole=(document.getElementById('location') as HTMLInputElement).value; 
    let role={newRole,departmentRole,description,locationRole,checkedRoleDetails};
    roles.push(role);
    employees.filter((employee : employeeData)=>{
        if(checkedRoleDetails?.includes(employee)){
            employee.department = departmentRole;
            employee.role=newRole;
        }
    });
    localStorage.setItem('roles', JSON.stringify(roles));    
    localStorage.setItem('employees',JSON.stringify(employees));
    (document.getElementById('roleForm') as HTMLFormElement).reset();
    let roleService=document.getElementById('service') as HTMLElement;
    roles.forEach((role:roleDataRow)=>{
        const roleDivBlock=createRoleComponent(role);
        roleService?.appendChild(roleDivBlock);
    })
}

// Role Page

let employeeDataRole : any=[];

let deptRole,locRole,newRoleAdd;
function createRoleComponent(roleData : roleDataRow){
    let roleDetailBlock=document.createElement('div');
    roleDetailBlock.classList.add('roleDetailBlock');

    let roleTitle=document.createElement('div');
    roleTitle.classList.add('roleTitle');
    let roleTitleHead=document.createElement('div');
    roleTitleHead.textContent=roleData.newRole;
    let roleEditImage=document.createElement('img');
    roleEditImage.src="/Images/edit.svg";
    roleEditImage.alt="Edit icon";
    roleTitle.appendChild(roleTitleHead);
    roleTitle.appendChild(roleEditImage);
    
    let roleDetails=document.createElement('div');
    roleDetails.classList.add('role-details');
    let roleDeptLoc=document.createElement('div');
    roleDeptLoc.classList.add('role-dept-loc');
    let roledeptImage=document.createElement('img');
    roledeptImage.src="/Images/team-icon.svg";
    roledeptImage.alt="Team";
    let roleDept=document.createElement('div');
    roleDept.textContent="Department";
    roleDeptLoc.appendChild(roledeptImage);
    roleDeptLoc.appendChild(roleDept);
    let roleDeptTitle=document.createElement('div');
    roleDeptTitle.textContent=roleData.departmentRole;
    roleDetails.appendChild(roleDeptLoc);
    roleDetails.appendChild(roleDeptTitle);

    let roleDetails1=document.createElement('div');
    roleDetails1.classList.add('role-details');
    let roleDeptLoc1=document.createElement('div');
    roleDeptLoc1.classList.add('role-dept-loc');
    let roledeptImage1=document.createElement('img');
    roledeptImage1.src="/Images/location.svg";
    roledeptImage1.alt="Team";
    let roleDept1=document.createElement('div');
    roleDept1.textContent="Location";
    roleDeptLoc1.appendChild(roledeptImage1);
    roleDeptLoc1.appendChild(roleDept1);
    let roleDeptTitle1=document.createElement('div');
    roleDeptTitle1.textContent=roleData.locationRole;
    roleDetails1.appendChild(roleDeptLoc1);
    roleDetails1.appendChild(roleDeptTitle1);

    let totalEmployeeCount=document.createElement('div');
    totalEmployeeCount.classList.add('role-department');
    totalEmployeeCount.classList.add('role-dept-employee');
    let empCount=document.createElement('div');
    empCount.classList.add('employee-count');
    empCount.textContent="Total Employees";
    let roleProfileImg=document.createElement('div');
    roleProfileImg.classList.add('profile-image');
    let i=1;
    employees.filter((employee : employeeData)=>{
        if(employee.department==roleData.departmentRole && employee.role==roleData.newRole && employee.location==roleData.locationRole){
            if(i<=4){
                let imgRoleEmp = document.createElement('img');
                imgRoleEmp.src = employee.profileImg;
                imgRoleEmp.alt = "Profile Image";
                imgRoleEmp.classList.add('profile-' + i);
                roleProfileImg.appendChild(imgRoleEmp);
            }
            i++;
        }
    })
    if(i>4){
        let limitEmpCount = document.createElement('div');
        limitEmpCount.classList.add('profile-5');
        let j=i-5;
        limitEmpCount.textContent = "+" + j;
        roleProfileImg.appendChild(limitEmpCount);
    }

    totalEmployeeCount.appendChild(empCount);
    totalEmployeeCount.appendChild(roleProfileImg);
    let roleEmployeesList=document.createElement('div');
    roleEmployeesList.classList.add('role-employees-list');
    employeeDataRole=roleData.checkedRoleDetails;
    roleEmployeesList.setAttribute('onclick', `employeesCountRole('${roleData.departmentRole}', '${roleData.locationRole}', '${roleData.newRole}')`);
    let employeeListTag=document.createElement('div');
    employeeListTag.textContent="View All Employees";
    let roleArrow=document.createElement('img');
    roleArrow.src="/Images/directionarrow.svg";
    roleArrow.alt="Arrow";
    roleEmployeesList.appendChild(employeeListTag);
    roleEmployeesList.appendChild(roleArrow);

    roleDetailBlock.appendChild(roleTitle);
    roleDetailBlock.appendChild(roleDetails);
    roleDetailBlock.appendChild(roleDetails1);
    roleDetailBlock.appendChild(totalEmployeeCount);
    roleDetailBlock.appendChild(roleEmployeesList);
    
    return roleDetailBlock;    
}

// MultiSelect for filter array

function multiSelectDepartment(){
    let selectBox=document.createElement('div');
    selectBox.classList.add('select-box');
    let optionContainerDepartment=document.createElement('div');
    optionContainerDepartment.classList.add('option-container2');
    optionContainerDepartment.classList.add('option-checkboxes');
    let departmentOptions=['Product Engineer','Human Resources','Quality Analyst','Finance','Infrastructure & Operations'];
    for(let i=0;i<departmentOptions.length;i++){
        let departmentOnClick=document.createElement('div');
        departmentOnClick.setAttribute('onClick','onCheckRole(this,event)');
        let optionDiv=document.createElement('div');
        optionDiv.classList.add('option');
        let inputCheck=document.createElement('input');
        inputCheck.type='checkbox';
        inputCheck.classList.add('check-box2');
        inputCheck.value=departmentOptions[i];
        inputCheck.name="Department";
        let optionValue=document.createElement('option');
        optionValue.value=departmentOptions[i];
        optionValue.textContent=departmentOptions[i];
        optionDiv.appendChild(inputCheck);
        optionDiv.appendChild(optionValue);
        departmentOnClick.appendChild(optionDiv);
        optionContainerDepartment.appendChild(departmentOnClick);
    }
    selectBox.appendChild(optionContainerDepartment);
    let statusBtn=document.getElementById('departmentDiv');
    statusBtn?.appendChild(selectBox);
    
}

function multiSelectLocation(){
    let selectBox=document.createElement('div');
    selectBox.classList.add('select-box');
    let optionContainerLocation=document.createElement('div');
    optionContainerLocation.classList.add('option-container3');
    optionContainerLocation.classList.add('option-checkboxes');
    let locationOptions=['Hyderabad','Banglore','Chennai'];
    for(let i=0;i<locationOptions.length;i++){
        let departmentOnClick=document.createElement('div');
        departmentOnClick.setAttribute('onClick','onCheckRole(this,event)');
        let optionDiv=document.createElement('div');
        optionDiv.classList.add('option');
        let inputCheck=document.createElement('input');
        inputCheck.type='checkbox';
        inputCheck.classList.add('check-box3');
        inputCheck.value=locationOptions[i];
        inputCheck.name="Location";
        let optionValue=document.createElement('option');
        optionValue.value=locationOptions[i];
        optionValue.textContent=locationOptions[i];
        optionDiv.appendChild(inputCheck);
        optionDiv.appendChild(optionValue);
        departmentOnClick.appendChild(optionDiv);
        optionContainerLocation.appendChild(departmentOnClick);
    }
    selectBox.appendChild(optionContainerLocation);
    let statusBtn=document.getElementById('locationDiv');
    statusBtn?.appendChild(selectBox);
    
}
//Filter in Roles Page

// Option container 2

var selectSearch2=document.getElementById('dropdownImg2') as HTMLElement;
var searchEmployee2 = document.querySelector('.search-employee2') as HTMLElement;
var checkbox2 : NodeListOf<HTMLInputElement>= document.querySelectorAll('.check-box2');

searchEmployee2?.addEventListener('input', function (this:HTMLInputElement) {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        const text : string | undefined = option.textContent?.toLowerCase();
        if (text?.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});
selectSearch2?.addEventListener('click', function () {
    multiSelectDepartment();
    (document.querySelector('.option-container2') as HTMLElement).style.display = 'block';
});
searchEmployee2?.addEventListener('click', function () {
    multiSelectDepartment();
    (document.querySelector('.option-container2') as HTMLElement).style.display = 'block';
});

document.addEventListener('click', function (event:Event) {
    if (!searchEmployee2?.contains(event.target as HTMLElement) && !(document.querySelector('.option-container2') as HTMLElement)?.contains(event.target as HTMLElement) && !selectSearch2?.contains(event.target as HTMLElement)) {
        (document.querySelector('.option-container2') as HTMLElement)? (document.querySelector('.option-container2') as HTMLElement).style.display = 'none':"";
    }
});

// Option container 3

var selectSearch3=document.getElementById('dropdownImg3') as HTMLElement;
var searchEmployee3 = document.querySelector('.search-employee3') as HTMLElement;
var checkbox3 : NodeListOf<HTMLInputElement> = document.querySelectorAll('.check-box3');

searchEmployee3?.addEventListener('input', function (this:HTMLInputElement) {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        const text : string | undefined = option.textContent?.toLowerCase();
        if (text?.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});

searchEmployee3?.addEventListener('click', function () {
    multiSelectLocation();
    (document.querySelector('.option-container3') as HTMLElement).style.display = 'block';
});
selectSearch3?.addEventListener('click', function () {
    multiSelectLocation();
    (document.querySelector('.option-container3') as HTMLElement).style.display = 'block';
});
document.addEventListener('click', function (event : Event) {
    if (!searchEmployee3?.contains(event.target as HTMLElement) && !(document.querySelector('.option-container3') as HTMLElement)?.contains(event.target as HTMLElement) && !selectSearch3?.contains(event.target as HTMLElement)) {
        (document.querySelector('.option-container3') as HTMLElement)?(document.querySelector('.option-container3') as HTMLElement).style.display = 'none':"";
    }
});

// OncheckRole

let filterarrayDepartmentRole : any= [];
let filterarrayLocationRole : any = [];
var cnt2=0,cnt3=0;
let onCheckRole=(element : any,event :Event)=>{
    let check = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
    let checkDiv=element.querySelector('.option') as HTMLInputElement;
        let namee=check.name;
        let value=check.value;
        if(checkDiv?.contains(event.target as HTMLElement)){
            if(check.checked){
                check.checked=false;
            }
            else{
                check.checked=true;
            }
        }
        if(check.contains(event.target as HTMLElement)){
            if(check.checked){
                check.checked=false;
            }
            else{
                check.checked=true;
            }
        }
        if (!check.checked) {
            if(namee=="Department"){
                     for(let i=0;i<filterarrayDepartmentRole.length;i++){
                         if(filterarrayDepartmentRole[i]==value){
                             cnt2-=1;
                             filterarrayDepartmentRole.splice(i,1);
                         }
                     }
                 (document.querySelector('.search-employee2') as HTMLInputElement).value="Department: "+cnt2;
             }
             else{
                 
                     for(let i=0;i<filterarrayLocationRole.length;i++){
                         if(filterarrayLocationRole[i]==value){
                             cnt3-=1;
                             filterarrayLocationRole.splice(i,1);
                         }
                     }
                     (document.querySelector('.search-employee3') as HTMLInputElement).value="Location: "+cnt3;
                     
             }
         } 
         else {
             if(namee=="Department"){
                 filterarrayDepartmentRole.push(value);
                 cnt2+=1;
                 (document.querySelector('.search-employee2') as HTMLInputElement).value="Department: "+cnt2;
             }
             else{
                 filterarrayLocationRole.push(value);
                 cnt3+=1;
                 (document.querySelector('.search-employee3') as HTMLInputElement).value="Location: "+cnt3;
             }        
         }
}

// Roles Filter

function displayResultRole(){
    let departmentFilter=roles.filter((role:roleDataRow)=>{
        if(filterarrayDepartmentRole.length==0){
            return role;
        }
        else if(filterarrayDepartmentRole?.includes(role.departmentRole)){
            return role;
        }
    })
    let locationFilter=departmentFilter.filter((role:roleDataRow)=>{
        if(filterarrayLocationRole.length==0){
            return role;
        }
        else if(filterarrayLocationRole?.includes(role.locationRole)){
            return role;
        }
    })
    let roleService=document.getElementById('service');
    roleService?roleService.innerHTML="":"";
    locationFilter.forEach((role:roleDataRow)=>{
        const roleDivBlock=createRoleComponent(role);
        roleService?.appendChild(roleDivBlock);
    })
}

function displayResetRole(){
    (document.querySelector('.search-employee2') as HTMLInputElement).value="";
    (document.querySelector('.search-employee3') as HTMLInputElement).value="";
    filterarrayDepartmentRole = [];
    filterarrayLocationRole = [];
    let roleService=document.getElementById('service');
    roleService?roleService.innerHTML="":"";
    roles.forEach((role:roleDataRow)=>{
        const roleDivBlock=createRoleComponent(role);
        roleService?.appendChild(roleDivBlock);
    })
}

function employeesCountRole(department : string, location:string, role :string){
    for(let i=0;i<employees.length;i++){
        if(employees[i].location==location && employees[i].department==department && employees[i].role==role){
            let personProfile = document.createElement('div');
            personProfile.classList.add('person-profile');
            let personDetails = document.createElement('div');
            personDetails.classList.add('person-details');
            let personImg = document.createElement('img');
            personImg.src = employees[i].profileImg;
            personImg.alt = "Profile Image";
            let personData = document.createElement('div');
            personData.classList.add('person-data');
            let personName = document.createElement('div');
            personName.classList.add('person-name');
            personName.textContent = employees[i].firstName + " " + employees[i].lastName;
            let personRole = document.createElement('div');
            personRole.classList.add('person-role');
            personRole.textContent = employees.role;
            personData.appendChild(personName);
            personData.appendChild(personRole);
            personDetails.appendChild(personImg);
            personDetails.appendChild(personData);
            personProfile.appendChild(personDetails);

            let personIdCard = document.createElement('div');
            personIdCard.classList.add('person-work-details');
            let idIcon = document.createElement('img');
            idIcon.src = "/Images/idcard.svg";
            idIcon.alt = "Id Card";
            let idNumber = document.createElement('div');
            idNumber.textContent = "INF" + Math.floor(Math.random() * 1000);
            personIdCard.appendChild(idIcon);
            personIdCard.appendChild(idNumber);
            personProfile.appendChild(personIdCard);

            let personMail = document.createElement('div');
            personMail.classList.add('person-work-details');
            let mailId = document.createElement('img');
            mailId.src = "/Images/email.svg";
            mailId.alt = "Email";
            let emailPerson = document.createElement('div');
            emailPerson.textContent = employees[i].email;
            personMail.appendChild(mailId);
            personMail.appendChild(emailPerson);
            personProfile.appendChild(personMail);

            let personTechnology = document.createElement('div');
            personTechnology.classList.add('person-work-details');
            let technologyIcon = document.createElement('img');
            technologyIcon.src = "/Images/team-icon.svg";
            technologyIcon.alt = "Technology";
            let technologyPerson = document.createElement('div');
            technologyPerson.textContent = employees[i].role;
            personTechnology.appendChild(technologyIcon);
            personTechnology.appendChild(technologyPerson);
            personProfile.appendChild(personTechnology);

            let personLocation = document.createElement('div');
            personLocation.classList.add('person-work-details');
            let workLocationIcon = document.createElement('img');
            workLocationIcon.src = "/Images/location.svg";
            workLocationIcon.alt = "Location";
            let workLocation = document.createElement('div');
            workLocation.textContent = employees[i].location;
            personLocation.appendChild(workLocationIcon);
            personLocation.appendChild(workLocation);
            personProfile.appendChild(personLocation);

            let viewPerson = document.createElement('div');
            viewPerson.classList.add('view-person');
            let viewDetails = document.createElement('div');
            viewDetails.textContent = "View";
            let viewIcon = document.createElement('img');
            viewIcon.src = "/Images/directionarrow.svg";
            viewIcon.alt = "View Arrow";
            viewPerson.appendChild(viewDetails);
            viewPerson.appendChild(viewIcon);
            personProfile.appendChild(viewPerson);

            let employeeDetail = document.querySelector(".detail-of-employee");
            employeeDetail?.appendChild(personProfile);
        }
    } 
}

// // window.addEventListener('DOMContentLoaded',function(){
// //     for(let i=0;i<employees.length;i++){
// //         if(employees[i].location==location && employees[i].department==department && employees[i].role==role){
// //             let personProfile = document.createElement('div');
// //             personProfile.classList.add('person-profile');
// //             let personDetails = document.createElement('div');
// //             personDetails.classList.add('person-details');
// //             let personImg = document.createElement('img');
// //             personImg.src = employees[i].profileImg;
// //             personImg.alt = "Profile Image";
// //             let personData = document.createElement('div');
// //             personData.classList.add('person-data');
// //             let personName = document.createElement('div');
// //             personName.classList.add('person-name');
// //             personName.textContent = employees[i].firstName + " " + employees[i].lastName;
// //             let personRole = document.createElement('div');
// //             personRole.classList.add('person-role');
// //             personRole.textContent = employees.role;
// //             personData.appendChild(personName);
// //             personData.appendChild(personRole);
// //             personDetails.appendChild(personImg);
// //             personDetails.appendChild(personData);
// //             personProfile.appendChild(personDetails);

// //             let personIdCard = document.createElement('div');
// //             personIdCard.classList.add('person-work-details');
// //             let idIcon = document.createElement('img');
// //             idIcon.src = "/Images/idcard.svg";
// //             idIcon.alt = "Id Card";
// //             let idNumber = document.createElement('div');
// //             idNumber.textContent = "INF" + Math.floor(Math.random() * 1000);
// //             personIdCard.appendChild(idIcon);
// //             personIdCard.appendChild(idNumber);
// //             personProfile.appendChild(personIdCard);

// //             let personMail = document.createElement('div');
// //             personMail.classList.add('person-work-details');
// //             let mailId = document.createElement('img');
// //             mailId.src = "/Images/email.svg";
// //             mailId.alt = "Email";
// //             let emailPerson = document.createElement('div');
// //             emailPerson.textContent = employees[i].email;
// //             personMail.appendChild(mailId);
// //             personMail.appendChild(emailPerson);
// //             personProfile.appendChild(personMail);

// //             let personTechnology = document.createElement('div');
// //             personTechnology.classList.add('person-work-details');
// //             let technologyIcon = document.createElement('img');
// //             technologyIcon.src = "/Images/team-icon.svg";
// //             technologyIcon.alt = "Technology";
// //             let technologyPerson = document.createElement('div');
// //             technologyPerson.textContent = employees[i].role;
// //             personTechnology.appendChild(technologyIcon);
// //             personTechnology.appendChild(technologyPerson);
// //             personProfile.appendChild(personTechnology);

// //             let personLocation = document.createElement('div');
// //             personLocation.classList.add('person-work-details');
// //             let workLocationIcon = document.createElement('img');
// //             workLocationIcon.src = "/Images/location.svg";
// //             workLocationIcon.alt = "Location";
// //             let workLocation = document.createElement('div');
// //             workLocation.textContent = employees[i].location;
// //             personLocation.appendChild(workLocationIcon);
// //             personLocation.appendChild(workLocation);
// //             personProfile.appendChild(personLocation);

// //             let viewPerson = document.createElement('div');
// //             viewPerson.classList.add('view-person');
// //             let viewDetails = document.createElement('div');
// //             viewDetails.textContent = "View";
// //             let viewIcon = document.createElement('img');
// //             viewIcon.src = "/Images/directionarrow.svg";
// //             viewIcon.alt = "View Arrow";
// //             viewPerson.appendChild(viewDetails);
// //             viewPerson.appendChild(viewIcon);
// //             personProfile.appendChild(viewPerson);

// //             let employeeDetail = document.querySelector(".detail-of-employee");
// //             employeeDetail?.appendChild(personProfile);
// //         }
// //     }
// // })

