let employees = JSON.parse(localStorage.getItem('employees')) || [];
let roles=JSON.parse(localStorage.getItem('roles')) || [];
var dataUncheck = [];
let filter_data = true;
function filterData() {
    if (filter_data == false) {
        document.getElementById("filterDataCategory").style.display = "flex";
    }
    else {
        document.getElementById("filterDataCategory").style.display = "none";
    }
    filter_data = !filter_data;
}

//To display sidepanel all,active,inactive

var displayData=true;
function displayDataList(){
    if(displayData==true){
        document.getElementById('employee-content-list')?document.getElementById('employee-content-list').style.display='block':"";
    }
    else{
        document.getElementById('employee-content-list')?document.getElementById('employee-content-list').style.display='none':"";
    }
    displayData=!displayData;
};



//creating each row in the table
function createRow(employee) {
    const row = document.createElement('tr');
    row.classList.add('table-row');
    const rowdata = [
        createBox(employee),
        createUser(employee),
        createLoc(employee.location),
        createLoc(employee.department),
        createLoc(employee.role),
        createLoc(employee.empNo),
        createStatus(employee.status),
        createJdate(employee.joinDate),
        createMore(employee)
    ]
    rowdata.forEach(rowd => {
        row.append(rowd);
    });
    return row;
}
window.onload = () => {
    // TABLE
    const tableBody = document.getElementById('tableEmployee');
    employees.forEach(employee => {
        const row = createRow(employee);
        tableBody?.appendChild(row);
    });

    // // ROLES
    // let roleService=document.getElementById('service');
    // roles.forEach(role=>{
    //     const roleDivBlock=createRoleComponent(role);
    //     roleService?.appendChild(roleDivBlock);
    // })
}
function createBox(employee) {
    const data = document.createElement('td');
    data.classList.add('check-box');
    const inp = document.createElement('input');
    inp.setAttribute('type', 'checkbox');
    inp.setAttribute('onClick', 'ischecked(this,"'+employee.empNo+'")');
    data.append(inp);
    return data;
}
function createUser(employee) {
    const data = document.createElement('td');
    data.classList.add('details');
    const tab1 = document.createElement('table');
    const tr1 = document.createElement('tr');
    tr1.classList.add('profile-pic');
    const td11 = document.createElement('td');
    td11.classList.add('tab1-details-tr');
    td11.rowSpan = 2;
    const image = document.createElement('img');
    image.setAttribute('src',employee.profileImg);
    image.setAttribute('alt', 'Profile picture of a man');
    td11.appendChild(image);
    tr1.appendChild(td11);
    const td12 = document.createElement('td');
    td12.classList.add('name');
    td12.innerText = employee.firstName + " " + employee.lastName;
    tr1.appendChild(td12);
    tab1.appendChild(tr1);
    const tr2 = document.createElement('tr');
    const td21 = document.createElement('td');
    td21.classList.add('emaill');
    td21.innerText = employee.email;
    tr2.appendChild(td21);
    tab1.appendChild(tr2);
    data.appendChild(tab1);
    return data;
}
function createLoc(text) {
    const data = document.createElement('td');
    data.classList.add('details');
    data.innerText = text;
    return data;
}
function createStatus(text) {
    const data = document.createElement('td');
    data.classList.add('details');
    const btn = document.createElement('button');    
    btn.textContent = text;
    if(text=="Active"){
        btn.classList.add('activeBtn');
    }
    else{
        btn.classList.add('inactiveBtn');
    }
    data.appendChild(btn);
    return data;
}
function createJdate(text) {
    const data = document.createElement('td');
    data.classList.add('details');
    data.textContent = text;
    return data;
}
function createMore(emp) {
    const data = document.createElement('td');
    const image = document.createElement('img');
    data.classList.add('dots-td');
    image.setAttribute('src', '/Images/dots.png');
    image.setAttribute('alt', 'image of three dots horizontally');
    image.classList.add('dots-icon');
    data.appendChild(image);
    const dotOption = document.createElement('div');
    dotOption.classList.add('dot-option');
    dotOption.id = "dotOpt";
    const li1 = document.createElement('li');
    li1.textContent = 'View Details';
    li1.classList.add('view-details');
    dotOption.appendChild(li1);
    const li2 = document.createElement('li');
    li2.textContent = 'Edit';
    li2.classList.add('edit');
    li2.setAttribute('onClick','editEmployeeData("'+emp.empNo+'")');
    // console.log(emp.empNo);
    dotOption.appendChild(li2);
    const li3 = document.createElement('li');
    li3.textContent = 'Delete';
    li3.classList.add('delete');
    li3.setAttribute('onClick','deleteEmployeeData("'+emp.empNo+'")');
    dotOption.appendChild(li3);  
    data.appendChild(dotOption);
    return data;
}

// Display All,Active,Inactive pages when on click

document.getElementById('employeeListAll')?.addEventListener('click',function(){
    document.getElementById('employeeListAll').style.color = "#F44848";
    document.getElementById('employeeListActive').style.color = "#878889";
    document.getElementById('employeeListInactive').style.color = "#878889";
    filterReset(employees);
})
document.getElementById('employeeListActive')?.addEventListener('click',function(){
    document.getElementById('employeeListActive').style.color="#F44848";
    document.getElementById('employeeListAll').style.color="#878889";
    document.getElementById('employeeListInactive').style.color="#878889";
    let activeData=[];
    activeData=employees.filter(ele=>{
        return ele.status=="Active";
    })
    filterReset(activeData);
})
document.getElementById('employeeListInactive')?.addEventListener('click',function(){
    document.getElementById('employeeListInactive').style.color="#F44848";
    document.getElementById('employeeListAll').style.color="#878889";
    document.getElementById('employeeListActive').style.color="#878889";
    let inactiveData=[];
    inactiveData=employees.filter(ele=>{
        return ele.status=="InActive";
    })
    filterReset(inactiveData);
})

// Edit data in table

function editEmployeeData(empNo){
    location.href="addemployee.html?empId="+empNo; 
}

// Cancel event

function cancelEvent(event){
    location.href="employee.html";
}

// Delete Selected row

function deleteEmployeeData(empNo){
    var checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    for(let i=0;i<checkboxes.length;i++){
        let row=checkboxes[i].parentNode.parentNode;
        if(row.cells[5].textContent==empNo){
            row.parentNode.removeChild(row);
        }        
    }
    employees=employees.filter(ele=>{
        if(ele.empNo!=empNo){
            return ele;
        }
    })
    // window.location.reload(true);
    localStorage.setItem('employees',JSON.stringify(employees));
}
//Multiselect dropdown

// Option container 1
const selectSearch1=document.getElementById('dropdownImg1');
const searchEmployee = document.querySelector('.search-employee1');
const optionContainer = document.querySelector('.option-container1');
const options = document.querySelectorAll('.option');
const checkbox1 = document.querySelectorAll('.check-box1');

selectSearch1?.addEventListener('click', function () {
    optionContainer.style.display = 'block';
});


searchEmployee?.addEventListener('input', function () {
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

searchEmployee?.addEventListener('click', function () {
    optionContainer.style.display = 'block';
});

document.addEventListener('click', function (event) {
    if (!searchEmployee?.contains(event.target) && !optionContainer?.contains(event.target) && !selectSearch1?.contains(event.target)) {
        optionContainer?optionContainer.style.display = 'none':"";
    }
});

// Option container 2

const selectSearch2=document.querySelector('#dropdownImg2');
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
document.querySelector('#dropdownImg2').addEventListener('click', function () {
    optionContainer2.style.display = 'block';
});
searchEmployee2?.addEventListener('click', function () {
    optionContainer2.style.display = 'block';
});

document.addEventListener('click', function (event) {
    if (!searchEmployee2?.contains(event.target) && !optionContainer2?.contains(event.target) && !selectSearch2?.contains(event.target)) {
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
    if (!searchEmployee3?.contains(event.target) && !optionContainer3?.contains(event.target) && !selectSearch3?.contains(event.target)) {
        optionContainer3?optionContainer3.style.display = 'none':"";
    }
});

// Store values of Option container in filterarray
let filterarrayStatus = [];
let filterarrayDepartment = [];
let filterarrayLocation = [];
var count1=0,count2=0,count3=0;
let onCheck=(ele,event)=>{
    let check=ele.querySelector('input[type="checkbox"]');
    // let target = event.target;
    if (!check.contains(event.target)) {
        let namee=check.name;
        let value=check.value;
        check.checked=!check.checked;
        if (!check.checked) {
            if (namee == "Status") {
                for (let i = 0; i < filterarrayStatus.length; i++) {
                    if (filterarrayStatus[i] == value) {
                        count1 -= 1;
                        filterarrayStatus.splice(i, 1);
                    }
                }
                document.querySelector('.search-employee1').value = "Status: " + count1;
            }
            else if (namee == "Department") {
                for (let i = 0; i < filterarrayDepartment.length; i++) {
                    if (filterarrayDepartment[i] == value) {
                        count2 -= 1;
                        filterarrayDepartment.splice(i, 1);
                    }
                }
                document.querySelector('.search-employee2').value = "Department: " + count2;
            }
            else {
                if (namee == "Location") {
                    for (let i = 0; i < filterarrayLocation.length; i++) {
                        if (filterarrayLocation[i] == value) {
                            count3 -= 1;
                            filterarrayLocation.splice(i, 1);
                        }
                    }
                    document.querySelector('.search-employee3').value = "Location: " + count3;
                }
            }
        }
        else {
            if (namee == "Status") {
                filterarrayStatus.push(value);
                count1 += 1;
                document.querySelector('.search-employee1').value = "Status: " + count1;
            }
            else if (namee == "Department") {
                filterarrayDepartment.push(value);
                count2 += 1;
                document.querySelector('.search-employee2').value = "Department: " + count2;
            }
            else {
                filterarrayLocation.push(value);
                count3 += 1;
                document.querySelector('.search-employee3').value = "Location: " + count3;
            }
        }
    }
}

//Filter data of button clicked

var char="";
let previousCheck="";
var alpha=new Array(26).fill(true);

getAlphabetButtons();

function getAlphabetButtons() {
    let alphabetContainer = document.getElementById("alphabetButtons");
    for (let i = 65; i <= 90; i++) {
        let char = String.fromCharCode(i);
        let button = document.createElement("button");
        button.classList.add('charButton');
        button.textContent = char;
        button.setAttribute("value", char);
        button.setAttribute("onclick", "filterAlphabet(this,event)");
        alphabetContainer.appendChild(button);
    }
}
function filterAlphabet(check,event){
    char=check.value;
    if(alpha[char.charCodeAt()-65]==true){
        alpha[char.charCodeAt()-65]=false;
        document.querySelector('.filteralphabet-icons').classList.add('checkdisplay');
        filteralphaClick(check,event);
    }
    else if(previousCheck==char){
        alpha[char.charCodeAt()-65]=true;
        document.querySelector('.filteralphabet-icons').classList.remove('checkdisplay');
        check.classList.remove('clicked');
        char="";
        previousCheck="";
        filterarrayStatus = [];
        filterarrayDepartment = [];
        filterarrayLocation = [];
        alphabetButtonFilter(event);
    }
    previousCheck=char;
}

function filteralphaClick(check,event){
    let btns=document.querySelectorAll('.charButton');
    btns.forEach(btn=>{
        btn.classList.remove('clicked');
    })
     char = check.value;
     check.classList.add('clicked');
     alphabetButtonFilter(event);
}

//Code for dropdown filter

function displayresult(event) {
    alphabetButtonFilter(event);
}
function displayReset() {
    count1=0,count2=0,count3=0;
    let btns=document.querySelectorAll('.charButton');
    char="";
    btns.forEach(btn=>{
        btn.classList.remove('clicked');
    })
    checkbox1.forEach(check=>{
        if(check.checked){
            check.checked=false;
            count1--;
        }
    })
    checkbox2.forEach(check=>{
        if(check.checked){
            check.checked=false;
            count2--;
        }
    })
    checkbox3.forEach(check=>{
        if(check.checked){
            check.checked=false;
            count3--;
        }
    })
    document.querySelector('.search-employee1')?document.querySelector('.search-employee1').value="":"";
    document.querySelector('.search-employee2')?document.querySelector('.search-employee2').value="":"";
    document.querySelector('.search-employee3')?document.querySelector('.search-employee3').value="":"";
    filterarrayStatus = [];
    filterarrayDepartment = [];
    filterarrayLocation = [];
    filterReset(employees);
}

let statusFilter=[];
let departmentFilter=[];
let locationFilter=[];
let alphabetFilter=[];
function alphabetButtonFilter(event){
    let applybutton=document.querySelector('.apply-button');    
    if(applybutton.contains(event.target) || char==""){
        statusFilter=employees.filter(ele=>{
            if(filterarrayStatus.length==0){
                return ele;
            }
            else if(filterarrayStatus.includes(ele.status)){
                return ele;
            }
        })
        departmentFilter=statusFilter.filter(ele=>{
            if(filterarrayDepartment.length==0){
                return ele;
            }
            else if(filterarrayDepartment.includes(ele.department)){
                return ele;
            }
        })
        locationFilter=departmentFilter.filter(ele=>{
            if(filterarrayLocation.length==0){
                return ele;
            }
            else if(filterarrayLocation.includes(ele.location)){
                return ele;
            }
        })
        alphabetFilter=locationFilter.filter(ele=>{
            if(char==""){
                return ele;
            }
            else if(ele.firstName.charAt(0).toUpperCase()==char){
                return ele;
            }
        })
    }
    else{
        alphabetFilter=locationFilter.filter(ele=>{
            if(char==""){
                return ele;
            }
            else if(ele.firstName.charAt(0).toUpperCase()==char){
                return ele;
            }
        })
    }
    
    filterReset(alphabetFilter);
}

function filterReset(results) {
    let filtereddata = document.getElementById("tableEmployee");
    filtereddata?filtereddata.innerHTML = '':"";
    const tableBody = document.getElementById('tableEmployee');
    results.forEach(result => {
        let filteredData = createRow(result);
        tableBody?tableBody.appendChild(filteredData):"";
    })
}

//Sort data according to column

let sortDataEmp=new Array(7).fill("asc");
function sortData(val) {
    const table = document.getElementById('employeetable');
    const tableData = table.querySelector('#tableEmployee');
    let tableRows = Array.from(tableData.querySelectorAll('.table-row'));    
    if(sortDataEmp[val]=="asc"){
        sortDataEmp[val]="dsc";
        tableRows.sort((a, b) => {
            const aval = a.querySelectorAll('.details')[val].textContent.trim();
            const bval = b.querySelectorAll('.details')[val].textContent.trim();
            return aval.localeCompare(bval);
        });
    }
    else{
        sortDataEmp[val]="asc";
        tableRows.sort((a, b) => {
            const aval = a.querySelectorAll('.details')[val].textContent.trim();
            const bval = b.querySelectorAll('.details')[val].textContent.trim();
            return bval.localeCompare(aval);
        });
    }
    
    tableData.innerHTML = '';
    tableRows.forEach(row => {
        tableData.append(row);
    })
}

// Delete all rows

document.querySelector('.check-box-thead')?.addEventListener('click',function(){
    var checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    for(let i=0;i<checkboxes.length;i++){   
            if(checkboxes[i].checked==true){
                    checkboxes[i].checked = false;
                    deleteBtn.style.backgroundColor = " #9EA8B6";
                    dataUncheck = [];
            }
            else{
                    checkboxes[i].checked = true;
                    let row=checkboxes[i].parentNode.parentNode;
                    dataUncheck.push(row.cells[5].textContent);
                    document.getElementById('deleteBtn').disabled = false;
                    document.getElementById('deleteBtn').style.backgroundColor = "#F89191";               
            }
    }
    // console.log(dataUncheck);
})
//Delete row

var count = 0;
let deleteBtn = document.getElementById('deleteBtn');
deleteBtn? deleteBtn.disabled = true:"";
if (deleteBtn?.disabled == true || count == 0) {
    deleteBtn? deleteBtn.style.backgroundColor = " #9EA8B6":"";
}
function deleteSelectedRows() {
    deleteBtn? deleteBtn.style.backgroundColor = " #9EA8B6":"";
    var checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
   //console.log(dataUncheck);
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        let check = document.querySelectorAll("#tableEmployee .check-box input")[i];
        if (check.checked) {
            var row = check.parentNode.parentNode; // Get the parent row
            row.parentNode.removeChild(row); // Remove the row  
        }
    }
    document.querySelector('.check-box-thead').checked=false;
    debugger;
    employees = employees.filter(employee => {   
        debugger;     
        if(!dataUncheck.includes(employee.empNo)){
            return employee;
        }
    });    
    localStorage.setItem('employees', JSON.stringify(employees));
}

function ischecked(check,empid) {
    //var checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    if (check.checked == false) {
        count--;
        for(let i=0;i<dataUncheck.length;i++){
            if(dataUncheck[i]==empid){
                dataUncheck.splice(i,1);
            }
        }
    }
    else if (check.checked) {
        count++;
        dataUncheck.push(empid);
        document.getElementById('deleteBtn').disabled = false;
        document.getElementById('deleteBtn').style.backgroundColor = "#F89191";
    }
    if (deleteBtn.disabled == true || count == 0) {
        deleteBtn.style.backgroundColor = " #9EA8B6";
    }
}

// Export table to Excel sheet

function exportData() {
    const tableBody=document.getElementById("tableEmployee");
    const data = Array.from(tableBody.querySelectorAll('.table-row')).map(row => {
        return Array.from(row.querySelectorAll('.details')).map(cell => cell.textContent);
    });
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'table.csv';
    link.click();
}
