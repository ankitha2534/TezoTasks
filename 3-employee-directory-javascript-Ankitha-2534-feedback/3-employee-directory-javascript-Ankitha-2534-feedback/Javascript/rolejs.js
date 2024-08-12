let employees = JSON.parse(localStorage.getItem('employees')) || [];
let roles=JSON.parse(localStorage.getItem('roles')) || [];

//--------------------------------------------ROLE PAGE---------------------------------------------------

window.onload = () => {
    // // TABLE
    // const tableBody = document.getElementById('tableEmployee');
    // employees.forEach(employee => {
    //     const row = createRow(employee);
    //     tableBody?.appendChild(row);
    // });

    // ROLES
    let roleService=document.getElementById('service');
    roles.forEach(role=>{
        const roleDivBlock=createRoleComponent(role);
        roleService.appendChild(roleDivBlock);
    })
}

//Multi-select in new role page

let cnt=0;
let checkedRoleDetails=[];
let assignEmployees=[];
let departmentRole;
document.querySelector('.search-employee')?.addEventListener('click',function(){
    let optionContainer=document.createElement('div');
    optionContainer.classList.add('option-container');
    if(cnt==0)document.querySelector('.options-optioncontainer').innerHTML="";
    
    assignEmployees=employees.filter(employee=>{
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
            let labelText=document.createElement('label');
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
            document.querySelector('.options-optioncontainer').appendChild(options);       
        }
        let optionsOptionContainer=document.querySelector('.options-optioncontainer');
        document.querySelector('.select-box').appendChild(optionsOptionContainer);
    }
})

const searchEmployeeRole = document.querySelector('.search-employee');
const optionContainerRole = document.querySelector('.options-optioncontainer');
const checkboxRole = document.querySelectorAll('.check-box-role');
optionContainerRole?optionContainerRole.style.display = 'none':"";
document.querySelector('.search-employee')?.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    document.querySelectorAll('.options').forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });    
});


document.querySelector('.search-employee')?.addEventListener('click', function () {
    document.querySelector('.select-search-role').style.border="2px solid #4C9AFF"
    optionContainerRole?optionContainerRole.style.display = 'block':"";    
});

document?.addEventListener('click', function (event) {
    if (!searchEmployeeRole?.contains(event.target) && !optionContainerRole?.contains(event.target)) {
        optionContainerRole?optionContainerRole.style.display = 'none':"";
        if(cnt==0)searchEmployeeRole? searchEmployeeRole.value="" : "";
        document.querySelector('.select-search-role')?document.querySelector('.select-search-role').style.border="2px solid #DFE1E6":"";
    }
});


// Checked or not

function checkRole(ele,event){
    let check=ele.querySelector('input[type="checkbox"]');
    if (!check.contains(event.target)) {
        check.checked = !check.checked; 
        departmentRole=document.getElementById('jobDept').value;
        if (check.checked) {
            cnt++;
            searchEmployeeRole.value = "Assigned Employees: " + cnt;
            checkedRoleDetails = assignEmployees.filter(ele => {
                if (check.id == ele.empNo) return ele;
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
            for (let i = 0; i < checkedRoleDetails; i++) {
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
    const newRole=document.getElementById('add-new-role').value;
    departmentRole=document.getElementById('jobDept').value;
    const description=document.getElementById('description').value;
    const locationRole=document.getElementById('location').value; 
    let role={newRole,departmentRole,description,locationRole,checkedRoleDetails};
    roles.push(role);
    //console.log(roles);
    employees.filter(ele=>{
        if(checkedRoleDetails.includes(ele)){
            ele.department = departmentRole;
            ele.role=newRole;
        }
    }) 
    //console.log(checkedRoleDetails);   
    document.getElementById('roleForm').reset();
    localStorage.setItem('roles', JSON.stringify(roles));    
    localStorage.setItem('employees',JSON.stringify(employees));
    let roleService=document.getElementById('service');
    roles.forEach(role=>{
        const roleDivBlock=createRoleComponent(role);
        roleService?.appendChild(roleDivBlock);
    })
}

// Role Page

// console.log(roles);
let employeeData=[];

let deptRole,locRole,newRoleAdd;
function createRoleComponent(roleData){
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
    employees.filter(emp=>{
        if(emp.department==roleData.departmentRole && emp.role==roleData.newRole && emp.location==roleData.locationRole){
            if(i<=4){
                let imgRoleEmp = document.createElement('img');
                imgRoleEmp.src = emp.profileImg;
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

    // let employeeLink=document.createElement('a');
    // employeeLink.href="role-employee.html";
    // employeeLink.classList.add('add-role-button');
    let roleEmployeesList=document.createElement('div');
    roleEmployeesList.classList.add('role-employees-list');
    employeeData=roleData.checkedRoleDetails;
    roleEmployeesList.setAttribute('onclick',employeesCountRole(roleData.departmentRole,roleData.locationRole,roleData.newRole));
    let employeeListTag=document.createElement('div');
    employeeListTag.textContent="View All Employees";
    let roleArrow=document.createElement('img');
    roleArrow.src="/Images/directionarrow.svg";
    roleArrow.alt="Arrow";
    roleEmployeesList.appendChild(employeeListTag);
    roleEmployeesList.appendChild(roleArrow);
    // employeeLink.appendChild(roleEmployeesList);

    roleDetailBlock.appendChild(roleTitle);
    roleDetailBlock.appendChild(roleDetails);
    roleDetailBlock.appendChild(roleDetails1);
    roleDetailBlock.appendChild(totalEmployeeCount);
    roleDetailBlock.appendChild(roleEmployeesList);
    
    // deptRole=roleData.departmentRole;
    // locRole=roleData.locationRole;
    // newRoleAdd=roleData.newRole;
    return roleDetailBlock;    
}

//Filter in Roles Page

// Option container 2

const selectSearch2=document.getElementById('dropdownImg2');
const searchEmployee2 = document.querySelector('.search-employee2');
const optionContainer2 = document.querySelector('.option-container2');
const checkbox2 = document.querySelectorAll('.check-box2');

searchEmployee2?.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});
selectSearch2?.addEventListener('click', function () {
    optionContainer2.style.display = 'block';
});
searchEmployee2?.addEventListener('click', function () {
    optionContainer2.style.display = 'block';
});

document.addEventListener('click', function (event) {
    if (!searchEmployee2?.contains(event.target) && !optionContainer2?.contains(event.target)) {
        optionContainer2? optionContainer2.style.display = 'none':"";
    }
});

// Option container 3

const selectSearch3=document.getElementById('dropdownImg3');
const searchEmployee3 = document.querySelector('.search-employee3');
const optionContainer3 = document.querySelector('.option-container3');
const checkbox3 = document.querySelectorAll('.check-box3');

searchEmployee3?.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});

searchEmployee3?.addEventListener('click', function () {
    optionContainer3.style.display = 'block';
});
selectSearch3?.addEventListener('click', function () {
    optionContainer3.style.display = 'block';
});
document.addEventListener('click', function (event) {
    if (!searchEmployee3?.contains(event.target) && !optionContainer3?.contains(event.target)) {
        optionContainer3?optionContainer3.style.display = 'none':"";
    }
});

// OncheckRole

let filterarrayDepartmentRole = [];
let filterarrayLocationRole = [];
var cnt2=0,cnt3=0;
let onCheckRole=(ele,event)=>{
    let check=ele.querySelector('input[type="checkbox"]');
    // let target = event.target;
    if (!check.contains(event.target)) {
        check.checked = !check.checked; 
        let namee=check.name;
        let value=check.value;
        if (!check.checked) {
            if(namee=="Department"){
                     for(let i=0;i<filterarrayDepartmentRole.length;i++){
                         if(filterarrayDepartmentRole[i]==value){
                             cnt2-=1;
                             filterarrayDepartmentRole.splice(i,1);
                         }
                     }
                 document.querySelector('.search-employee2').value="Department: "+cnt2;
             }
             else{
                 
                     for(let i=0;i<filterarrayLocationRole.length;i++){
                         if(filterarrayLocationRole[i]==value){
                             cnt3-=1;
                             filterarrayLocationRole.splice(i,1);
                         }
                     }
                     document.querySelector('.search-employee3').value="Location: "+cnt3;
                     
             }
         } 
         else {
             if(namee=="Department"){
                 filterarrayDepartmentRole.push(value);
                 cnt2+=1;
                 document.querySelector('.search-employee2').value="Department: "+cnt2;
             }
             else{
                 filterarrayLocationRole.push(value);
                 cnt3+=1;
                 document.querySelector('.search-employee3').value="Location: "+cnt3;
             }        
         }
    }
}

// Roles Filter

function displayResultRole(){
    let departmentFilter=roles.filter(ele=>{
        if(filterarrayDepartmentRole.length==0){
            return ele;
        }
        else if(filterarrayDepartmentRole.includes(ele.departmentRole)){
            return ele;
        }
    })
    let locationFilter=departmentFilter.filter(ele=>{
        if(filterarrayLocationRole.length==0){
            return ele;
        }
        else if(filterarrayLocationRole.includes(ele.locationRole)){
            return ele;
        }
    })
    let roleService=document.getElementById('service');
    roleService?roleService.innerHTML="":"";
    locationFilter.forEach(role=>{
        const roleDivBlock=createRoleComponent(role);
        roleService?.appendChild(roleDivBlock);
    })
}

function displayResetRole(){
    document.querySelector('.search-employee2').value="";
    document.querySelector('.search-employee3').value="";
    filterarrayDepartmentRole = [];
    filterarrayLocationRole = [];
    let roleService=document.getElementById('service');
    roleService?roleService.innerHTML="":"";
    roles.forEach(role=>{
        const roleDivBlock=createRoleComponent(role);
        roleService?.appendChild(roleDivBlock);
    })
}

function employeesCountRole(){
    // console.log(employeeInRole);
    // location.href="role-employee.html";   
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

// window.addEventListener('DOMContentLoaded',function(){
//     for(let i=0;i<employees.length;i++){
//         if(employees[i].location==location && employees[i].department==department && employees[i].role==role){
//             let personProfile = document.createElement('div');
//             personProfile.classList.add('person-profile');
//             let personDetails = document.createElement('div');
//             personDetails.classList.add('person-details');
//             let personImg = document.createElement('img');
//             personImg.src = employees[i].profileImg;
//             personImg.alt = "Profile Image";
//             let personData = document.createElement('div');
//             personData.classList.add('person-data');
//             let personName = document.createElement('div');
//             personName.classList.add('person-name');
//             personName.textContent = employees[i].firstName + " " + employees[i].lastName;
//             let personRole = document.createElement('div');
//             personRole.classList.add('person-role');
//             personRole.textContent = employees.role;
//             personData.appendChild(personName);
//             personData.appendChild(personRole);
//             personDetails.appendChild(personImg);
//             personDetails.appendChild(personData);
//             personProfile.appendChild(personDetails);

//             let personIdCard = document.createElement('div');
//             personIdCard.classList.add('person-work-details');
//             let idIcon = document.createElement('img');
//             idIcon.src = "/Images/idcard.svg";
//             idIcon.alt = "Id Card";
//             let idNumber = document.createElement('div');
//             idNumber.textContent = "INF" + Math.floor(Math.random() * 1000);
//             personIdCard.appendChild(idIcon);
//             personIdCard.appendChild(idNumber);
//             personProfile.appendChild(personIdCard);

//             let personMail = document.createElement('div');
//             personMail.classList.add('person-work-details');
//             let mailId = document.createElement('img');
//             mailId.src = "/Images/email.svg";
//             mailId.alt = "Email";
//             let emailPerson = document.createElement('div');
//             emailPerson.textContent = employees[i].email;
//             personMail.appendChild(mailId);
//             personMail.appendChild(emailPerson);
//             personProfile.appendChild(personMail);

//             let personTechnology = document.createElement('div');
//             personTechnology.classList.add('person-work-details');
//             let technologyIcon = document.createElement('img');
//             technologyIcon.src = "/Images/team-icon.svg";
//             technologyIcon.alt = "Technology";
//             let technologyPerson = document.createElement('div');
//             technologyPerson.textContent = employees[i].role;
//             personTechnology.appendChild(technologyIcon);
//             personTechnology.appendChild(technologyPerson);
//             personProfile.appendChild(personTechnology);

//             let personLocation = document.createElement('div');
//             personLocation.classList.add('person-work-details');
//             let workLocationIcon = document.createElement('img');
//             workLocationIcon.src = "/Images/location.svg";
//             workLocationIcon.alt = "Location";
//             let workLocation = document.createElement('div');
//             workLocation.textContent = employees[i].location;
//             personLocation.appendChild(workLocationIcon);
//             personLocation.appendChild(workLocation);
//             personProfile.appendChild(personLocation);

//             let viewPerson = document.createElement('div');
//             viewPerson.classList.add('view-person');
//             let viewDetails = document.createElement('div');
//             viewDetails.textContent = "View";
//             let viewIcon = document.createElement('img');
//             viewIcon.src = "/Images/directionarrow.svg";
//             viewIcon.alt = "View Arrow";
//             viewPerson.appendChild(viewDetails);
//             viewPerson.appendChild(viewIcon);
//             personProfile.appendChild(viewPerson);

//             let employeeDetail = document.querySelector(".detail-of-employee");
//             employeeDetail?.appendChild(personProfile);
//         }
//     }
// })

