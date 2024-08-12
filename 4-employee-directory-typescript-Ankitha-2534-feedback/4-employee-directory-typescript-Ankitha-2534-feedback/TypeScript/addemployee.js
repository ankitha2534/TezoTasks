"use strict";
//Local Storage data storing and retreiving
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var employeesJSON = localStorage.getItem('employees');
var employees = employeesJSON ? JSON.parse(employeesJSON) : [];
var rolesJSON = localStorage.getItem('roles');
var roles = rolesJSON ? JSON.parse(rolesJSON) : [];
let statusVal = 0;
//Showing current date in placeholder for date of joining
const dateInput = document.getElementById('doj');
if (dateInput) {
    dateInput.value = formatDate();
    // Add event listener to the date input to check validity on change
    dateInput.addEventListener('change', function (event) {
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        if (selectedDate >= currentDate) {
            let doj = document.getElementById('doj');
            let fieldRequired = document.getElementById('field-required5');
            inputValidation(doj, fieldRequired);
            dateInput.value = formatDate(currentDate); // Reset to current date
        }
    });
}
function addZero(num) {
    return num.toString().padStart(2, '0');
}
function formatDate(date = new Date()) {
    return [
        date.getFullYear(),
        addZero(date.getMonth() + 1),
        addZero(date.getDate()),
    ].join('-');
}
function addEmp(event) {
    var _a, _b;
    event.preventDefault();
    const profileImg = ((_a = document.getElementById('fileProfileImage')) === null || _a === void 0 ? void 0 : _a.getAttribute('src')) || "Images/profile-user.png";
    const empNo = document.getElementById('empNum').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobNum').value;
    const joinDate = document.getElementById('doj').value;
    const location = document.getElementById('location').value;
    const role = document.getElementById('jobTitle').value;
    const department = document.getElementById('jobDept').value;
    const manager = document.getElementById('manager').value;
    const project = document.getElementById('project').value;
    let status = '';
    if (statusVal === 0) {
        status = "Active";
        statusVal = 1;
    }
    else {
        status = "InActive";
        statusVal = 0;
    }
    let empNoUnique = 0;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].empNo == empNo) {
            empNoUnique = 1;
        }
    }
    validateForm(empNo, firstName, lastName, email, joinDate, mobileNumber);
    let patternName = /(\s)*([A-Z][a-z]+|[A-Z])/i;
    let pattern = /((([a-z]+)|([a-z]+[0-9]+))@([a-z]+).([a-z]+))/i;
    let patternDate = /^((\d\d\d\d)-(\d\d)-(\d\d))/i;
    if ((empNo !== "" && empNoUnique != 1) && (firstName !== "" && firstName.match(patternName)) && (lastName !== "" && lastName.match(patternName)) && (email !== "" && email.match(pattern)) && (joinDate !== "" && joinDate.match(patternDate))) {
        const employee = {
            profileImg, empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, role, department, manager, project, status
        };
        employees.push(employee);
        const alertBoxAdded = document.querySelector('.alert-box-added');
        if (alertBoxAdded) {
            alertBoxAdded.style.display = "block";
            setTimeout(function () {
                alertBoxAdded.style.display = "none";
            }, 1000);
        }
        profileInput.src = "Images/profile-user.png";
        localStorage.setItem('employees', JSON.stringify(employees));
        localStorage.setItem('roles', JSON.stringify(roles));
        (_b = document.getElementById('employee-form')) === null || _b === void 0 ? void 0 : _b.reset();
    }
}
//Form validation for required fields
function validateForm(empNo, firstName, lastName, email, joinDate, mobileNumber) {
    let patternName = /(\s)*([A-Z][a-z]+|[A-Z])/i;
    let pattern = /((([a-z]+)|([a-z]+[0-9]+))@([a-z]+).([a-z]+))/i;
    let patternDate = /^((\d\d\d\d)-(\d\d)-(\d\d))/i;
    let empNoUnique = 0;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].empNo == empNo) {
            empNoUnique = 1;
        }
    }
    if (empNo == "" || empNoUnique == 1) {
        let empNum = document.getElementById('empNum');
        let fieldRequired = document.getElementById('field-required1');
        inputValidation(empNum, fieldRequired);
    }
    if (firstName == "" || !firstName.match(patternName)) {
        console.log("Fname");
        let fname = document.getElementById('fname');
        let fieldRequired = document.getElementById('field-required2');
        inputValidation(fname, fieldRequired);
    }
    if (lastName == "" || !lastName.match(patternName)) {
        let lname = document.getElementById('lname');
        let fieldRequired = document.getElementById('field-required3');
        inputValidation(lname, fieldRequired);
    }
    // if(mobileNumber.length!=10){
    //     let mobNum=(document.getElementById('mobNum') as HTMLInputElement);
    //     let fieldRequired=(document.getElementById('field-required6') as HTMLInputElement);
    //     inputValidation(mobNum,fieldRequired);
    // }
    if (email == "" || !email.match(pattern)) {
        let mail = document.getElementById('email');
        let fieldRequired = document.getElementById('field-required4');
        inputValidation(mail, fieldRequired);
    }
    if (joinDate == "" || !joinDate.match(patternDate)) {
        let doj = document.getElementById('doj');
        let fieldRequired = document.getElementById('field-required5');
        inputValidation(doj, fieldRequired);
    }
}
function inputValidation(inputField, fieldRequired) {
    inputField.classList.add('active');
    fieldRequired.classList.add('active');
    inputField.addEventListener('input', function () {
        if (this.value.length >= 0) {
            inputField.classList.remove('active');
            fieldRequired.classList.remove('active');
        }
    });
}
function validateDOB() {
    const dob = document.getElementById('dob').value;
    let patternDate = /^((\d\d\d\d)-(\d\d)-(\d\d))/i;
    if (!dob.match(patternDate)) {
        let dateOfBirth = document.getElementById('dob');
        let fieldRequired = document.getElementById('field-required7');
        inputValidation(dateOfBirth, fieldRequired);
    }
}
function validMobileNo() {
    const mobileNumber = document.getElementById('mobNum');
    if (mobileNumber.value) {
        if (mobileNumber.value.length !== 10) {
            document.getElementById('mobNum').classList.add('active');
            document.getElementById('field-required6').classList.add('active');
        }
        if (mobileNumber.value.length == 10) {
            document.getElementById('mobNum').classList.remove('active');
            document.getElementById('field-required6').classList.remove('active');
        }
    }
}
// Access Image
(_a = document.getElementById('profileBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    document.getElementById('profileInput').click();
});
const fileInput = document.getElementById('profileInput');
const profileInput = document.getElementById('fileProfileImage');
let profileImgSrc;
fileInput === null || fileInput === void 0 ? void 0 : fileInput.addEventListener('change', function (event) {
    var _a, _b;
    // const file = this.files[0]; 
    const file = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a, _b;
            profileImgSrc = (_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result) !== null && _b !== void 0 ? _b : "";
            profileInput.setAttribute('src', profileImgSrc);
        };
        reader.readAsDataURL(file);
    }
});
// Edit employee Details
document === null || document === void 0 ? void 0 : document.addEventListener('DOMContentLoaded', function () {
    var a = new URLSearchParams(window.location.search);
    let editEmpNo = a.get("empId");
    employees.filter((employee) => {
        if (employee.empNo == editEmpNo) {
            document.querySelector('.btn-3') ? document.querySelector('.btn-3').style.display = "block" : "";
            document.querySelector('.btn-2') ? document.querySelector('.btn-2').style.display = "none" : "";
            document.getElementById('fileProfileImage') ? document.getElementById('fileProfileImage').src = employee.profileImg : "";
            document.getElementById('empNum') ? document.getElementById('empNum').value = employee.empNo : "";
            document.getElementById('fname') ? document.getElementById('fname').value = employee.firstName : "";
            document.getElementById('lname') ? document.getElementById('lname').value = employee.lastName : "";
            document.getElementById('dob') ? document.getElementById('dob').value = employee.dob : "";
            document.getElementById('email') ? document.getElementById('email').value = employee.email : "";
            document.getElementById('mobNum') ? document.getElementById('mobNum').value = employee.mobileNumber : "";
            document.getElementById('doj') ? document.getElementById('doj').value = employee.joinDate : "";
            document.getElementById('location') ? document.getElementById('location').value = employee.location : "";
            document.getElementById('jobTitle') ? document.getElementById('jobTitle').value = employee.role : "";
            document.getElementById('jobDept') ? document.getElementById('jobDept').value = employee.department : "";
            document.getElementById('manager') ? document.getElementById('manager').value = employee.manager : "";
            document.getElementById('project') ? document.getElementById('project').value = employee.project : "";
        }
    });
});
function editEmp() {
    var a = new URLSearchParams(window.location.search);
    let editEmpNo = a.get("empId");
    employees.filter((employee) => {
        if (employee.empNo == editEmpNo) {
            employee.profileImg = document.getElementById('fileProfileImage').getAttribute('src');
            employee.empNo = document.getElementById('empNum').value;
            employee.firstName = document.getElementById('fname').value;
            employee.lastName = document.getElementById('lname').value;
            employee.dob = document.getElementById('dob').value;
            employee.email = document.getElementById('email').value;
            employee.mobileNumber = document.getElementById('mobNum').value;
            employee.joinDate = document.getElementById('doj').value;
            employee.location = document.getElementById('location').value;
            employee.role = document.getElementById('jobTitle').value;
            employee.department = document.getElementById('jobDept').value;
            employee.manager = document.getElementById('manager').value;
            employee.project = document.getElementById('project').value;
        }
    });
    localStorage.setItem('employees', JSON.stringify(employees));
    profileInput.src = "Images/profile-user.png";
    window.location.href = 'employee.html';
}
// Cancel event
function cancelEvent() {
    window.location.href = 'http://127.0.0.1:5500/employee.html';
}
