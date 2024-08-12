//Local Storage data storing and retreiving

let employees = JSON.parse(localStorage.getItem('employees')) || [];//When recieving data from webserver the data will be in string and JSON.parse() will convert strings to object.
let roles = JSON.parse(localStorage.getItem('roles')) || [];
let statusVal=0;
function addEmp(event) {
    event.preventDefault();
    const profileImg=document.getElementById('fileProfileImage').src;
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
    let status;
    if(statusVal==0){
        status = "Active";
        statusVal=1;
    }
    else{
        status = "InActive";
        statusVal=0;
    } 
    validateForm();
    // if (!validateMobileNumber(mobileNumber)) {
    //     alert("Please enter a valid 10-digit mobile number.");
    //     return;
    // }
    let pattern = /((([a-z]+)|([a-z]+[0-9]+))@([a-z]+).([a-z]+))/i;
    if (!email.match(pattern)) {
        alert("Please enter a valid mailId");
        return;
    }
    let namePattern = /([a-z]+)|([A-Z]+)/i;
    if (!firstName.match(namePattern) || !lastName.match(namePattern)) {
        alert("Please enter a valid name");
        return;
    }
    let date = new Date();
    let validEmployee = date.getFullYear()-dob.getFullYear();
    if(validEmployee <= 18){
        alert("Please enter a valid date of birth");
        return;
    }

    // {newRole,departmentRole,description,locationRole,checkedRoleDetails,roleId};
    let statusOfEmp=['Active','InActive'];
    if(empNo!=="" && firstName!=="" && lastName!=="" && email!=="" && joinDate!=="" && mobileNumber.length==10){
        const employee = {
            profileImg, empNo, firstName, lastName, dob, email, mobileNumber, joinDate, location, role, department, manager, project, status
        };

        employees.push(employee);
        document.querySelector('.alert-box-added').style.display="block";
        setTimeout(function() {
            document.querySelector('.alert-box-added').style.display = "none";
        }, 1000); 
        //console.log(roles);
        profileInput.src="Images/profile-user.png";
        localStorage.setItem('employees', JSON.stringify(employees));//When sending data to webserver the data should be in string and JSON.stringify() will convert objects into string.    
        localStorage.setItem('roles', JSON.stringify(roles));
        document.getElementById('employee-form').reset();              
    }
    
}

//Form validation for required fields

function validateForm(){
    var count=0;
    const empNo = document.getElementById('empNum').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const joinDate = document.getElementById('doj').value;
    const mobileNumber = document.getElementById('mobNum').value;
    if(!empNo){
        document.getElementById('empNum').classList.add('active');
        document.getElementById('field-required1').classList.add('active');
        document.getElementById('empNum').addEventListener('input',function(){
            if(this.value.length>=0){
                document.getElementById('empNum').classList.remove('active');
                document.getElementById('field-required1').classList.remove('active');
            }
        })
    }
    if(!firstName){
        document.getElementById('fname').classList.add('active');
        document.getElementById('field-required2').classList.add('active');
        document.getElementById('fname').addEventListener('input',function(){
            if(this.value.length>=0){
                document.getElementById('fname').classList.remove('active');
                document.getElementById('field-required2').classList.remove('active');
            }
        })
    }
    if(!lastName){
        document.getElementById('lname').classList.add('active');
        document.getElementById('field-required3').classList.add('active');
        document.getElementById('lname').addEventListener('input',function(){
            if(this.value.length>=0){
                document.getElementById('lname').classList.remove('active');
                document.getElementById('field-required3').classList.remove('active');
            }
        })
    }
    if(mobileNumber.length!=10){
        document.getElementById('mobNum').classList.add('active');
        document.getElementById('field-required6').classList.add('active');
        document.getElementById('mobNum').addEventListener('input',function(){
            if(this.value.length>=0){
                document.getElementById('mobNum').classList.remove('active');
                document.getElementById('field-required6').classList.remove('active');
            }
        })
    }
    if(!email){
        document.getElementById('email').classList.add('active');
        document.getElementById('field-required4').classList.add('active');
        document.getElementById('email').addEventListener('input',function(){
            if(this.value.length>=0){
                document.getElementById('email').classList.remove('active');
                document.getElementById('field-required4').classList.remove('active');
            }
        })
    }
    if(!joinDate){
        document.getElementById('doj').classList.add('active');
        document.getElementById('field-required5').classList.add('active');
        document.getElementById('doj').addEventListener('input',function(){
            if(this.value.length>=0){
                document.getElementById('doj').classList.remove('active');
                document.getElementById('field-required5').classList.remove('active');
            }
        })
    }
}

//Showing current date in placeholder for date of joining

const dateInput = document.getElementById('doj');

dateInput?dateInput.value = formatDate():"";
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

// Access Image

document.getElementById('profileBtn')?.addEventListener('click',function(){
    document.getElementById('profileInput').click();
});

const fileInput = document.getElementById('profileInput');
const profileInput=document.getElementById('fileProfileImage');
let profileImgSrc;
fileInput?.addEventListener('change', function() {
    const file = this.files[0]; 
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            profileImgSrc = e.target.result;
            profileInput.setAttribute('src', profileImgSrc);
        }
        reader.readAsDataURL(file); 
    }
});


// Edit employee Details

document?.addEventListener('DOMContentLoaded', function() {
    // let editEmpNo=localStorage.getItem('empNo');
    var a =new URLSearchParams(window.location.search);
    let editEmpNo=a.get("empId");
    employees.filter(emp=>{
        if(emp.empNo==editEmpNo){
            document.querySelector('.btn-3')?document.querySelector('.btn-3').style.display="block":"";
            document.querySelector('.btn-2')?document.querySelector('.btn-2').style.display="none":"";
            document.getElementById('fileProfileImage')?document.getElementById('fileProfileImage').src= emp.profileImg:"";
            document.getElementById('empNum')?document.getElementById('empNum').value=emp.empNo:"";
            document.getElementById('fname')?document.getElementById('fname').value=emp.firstName:"";
            document.getElementById('lname')?document.getElementById('lname').value=emp.lastName:"";
            document.getElementById('dob')?document.getElementById('dob').value=emp.dob:"";
            document.getElementById('email')?document.getElementById('email').value=emp.email:"";
            document.getElementById('mobNum')?document.getElementById('mobNum').value=emp.mobileNumber:"";
            document.getElementById('doj')?document.getElementById('doj').value=emp.joinDate:"";
            document.getElementById('location')?document.getElementById('location').value=emp.location:"";
            document.getElementById('jobTitle')?document.getElementById('jobTitle').value=emp.role:"";
            document.getElementById('jobDept')?document.getElementById('jobDept').value=emp.department:"";
            document.getElementById('manager')?document.getElementById('manager').value=emp.manager:"";
            document.getElementById('project')?document.getElementById('project').value=emp.project:"";
        }
    })
});

function editEmp(){
    // let editEmpNo=localStorage.getItem('empNo');
    var a =new URLSearchParams(window.location.search);
    let editEmpNo=a.get("empId");
    employees.filter(emp=>{
        if(emp.empNo==editEmpNo){
            emp.profileImg = document.getElementById('fileProfileImage').src;
            emp.empNo = document.getElementById('empNum').value;
            emp.firstName = document.getElementById('fname').value;
            emp.lastName = document.getElementById('lname').value;
            emp.dob = document.getElementById('dob').value;
            emp.email = document.getElementById('email').value;
            emp.mobileNumber = document.getElementById('mobNum').value;
            emp.joinDate = document.getElementById('doj').value;
            emp.location = document.getElementById('location').value;
            emp.role = document.getElementById('jobTitle').value;
            emp.department = document.getElementById('jobDept').value;
            emp.manager = document.getElementById('manager').value;
            emp.project = document.getElementById('project').value;
            return;
        }
    })
    localStorage.setItem('employees',JSON.stringify(employees));
    profileInput.src="Images/profile-user.png";
    document.getElementById('employee-form').reset();   
}

