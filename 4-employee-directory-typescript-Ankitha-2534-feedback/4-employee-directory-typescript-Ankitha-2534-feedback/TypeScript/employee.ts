var employeesJSON=localStorage.getItem('employees');
var employees=employeesJSON ? JSON.parse(employeesJSON) : [];
var rolesJSON = localStorage.getItem('roles');
var roles= rolesJSON ? JSON.parse(rolesJSON) : [];

import { employeeData } from './employeeRoleData';


// Search data from table

(document.querySelector('.searchBar input') as HTMLInputElement).addEventListener('input',function(this:HTMLInputElement){
    let searchText=this.value.toLowerCase();
    console.log(searchText);
    let searchTableData : employeeData[]=[];
    employees.forEach((employee : employeeData)=>{
        if(employee.firstName.toLowerCase().includes(searchText)){
            //return employee;
            searchTableData.push(employee);
        }
    })
    filterReset(searchTableData);
});

// Display filter row

var dataUncheck : string[]= [];

let filterDataVar = true;
function filterData() {
    if (filterDataVar == false) {
        (document.getElementById("filterDataCategory") as HTMLElement).style.display = "flex";
    }
    else {
        (document.getElementById("filterDataCategory") as HTMLElement).style.display = "none";
    }
    filterDataVar = !filterDataVar;
}

//To display sidepanel all,active,inactive

var displayData=true;
function displayDataList(){
    if(displayData==true){
        document.getElementById('employee-content-list')?(document.getElementById('employee-content-list') as HTMLElement).style.display='block':"";
    }
    else{
        document.getElementById('employee-content-list')?(document.getElementById('employee-content-list') as HTMLElement).style.display='none':"";
    }
    displayData=!displayData;
};



//creating each row in the table

function createRow(employee: employeeData): HTMLTableRowElement {
    const row: HTMLTableRowElement = document.createElement('tr');
    row.classList.add('table-row');

    const rowdata: HTMLElement[] = [
        createCheckBox(employee),
        createUser(employee),
        createTableCell(employee.location),
        createTableCell(employee.department),
        createTableCell(employee.role),
        createTableCell(employee.empNo),
        createStatus(employee.status),
        createJoinDate(employee.joinDate),
        createMenu(employee)
    ];

    rowdata.forEach(rowd => {
        row.append(rowd);
    });

    return row;
}

window.onload = () => {
    // TABLE
    const tableBody = document.getElementById('tableEmployee');
    employees.forEach((employee:any) => {
        const row = createRow(employee);
        tableBody?.appendChild(row);
    });
}

function createCheckBox(employee :employeeData) {
    const data = document.createElement('td');
    data.classList.add('check-box');
    const inp = document.createElement('input');
    inp.setAttribute('type', 'checkbox');
    inp.setAttribute('onClick', 'ischecked(this,"'+employee.empNo+'")');
    data.append(inp);
    return data;
}
function createUser(employee : employeeData) {
    const data = document.createElement('td');
    data.classList.add('details');
    const tableDetail = document.createElement('table');
    const trImageName = document.createElement('tr');
    trImageName.classList.add('profile-pic');
    const tdImage = document.createElement('td');
    tdImage.classList.add('tab1-details-tr');
    tdImage.rowSpan = 2;
    const image = document.createElement('img');
    image.setAttribute('src',employee.profileImg);
    image.setAttribute('alt', 'Profile picture of a man');
    tdImage.appendChild(image);
    trImageName.appendChild(tdImage);
    const tdName = document.createElement('td');
    tdName.classList.add('name');
    tdName.innerText = employee.firstName + " " + employee.lastName;
    trImageName.appendChild(tdName);
    tableDetail.appendChild(trImageName);
    const trMail = document.createElement('tr');
    const tdMail = document.createElement('td');
    tdMail.classList.add('emaill');
    tdMail.innerText = employee.email;
    trMail.appendChild(tdMail);
    tableDetail.appendChild(trMail);
    data.appendChild(tableDetail);
    return data;
}
function createTableCell(text : string) {
    const data = document.createElement('td');
    data.classList.add('details');
    data.innerText = text;
    return data;
}
function createStatus(text : string) {
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
function createJoinDate(text : string) {
    const data = document.createElement('td');
    data.classList.add('details');
    data.textContent = text;
    return data;
}
function createMenu(employee : employeeData) {
    const data = document.createElement('td');
    const image = document.createElement('img');
    data.classList.add('dots-td');
    image.setAttribute('src', '/Images/dots.png');
    image.setAttribute('alt', 'image of three dots horizontally');
    image.classList.add('dots-icon');
    data.appendChild(image);
    const menuOption = document.createElement('div');
    menuOption.classList.add('dot-option');
    menuOption.id = "dotOpt";
    const employeeDetail = document.createElement('li');
    employeeDetail.textContent = 'View Details';
    employeeDetail.classList.add('view-details');
    menuOption.appendChild(employeeDetail);
    const editEmployee = document.createElement('li');
    editEmployee.textContent = 'Edit';
    editEmployee.classList.add('edit');
    editEmployee.setAttribute('onClick','editEmployeeData("'+employee.empNo+'")');
    menuOption.appendChild(editEmployee);
    const deleteEmployee = document.createElement('li');
    deleteEmployee.textContent = 'Delete';
    deleteEmployee.classList.add('delete');
    deleteEmployee.setAttribute('onClick','deleteEmployeeData("'+employee.empNo+'")');
    menuOption.appendChild(deleteEmployee);  
    data.appendChild(menuOption);
    return data;
}

// Display All,Active,Inactive pages when on click

document.getElementById('employeeListAll')?.addEventListener('click',function(){
    (document.getElementById('employeeListAll') as HTMLElement).classList.add('enable');
    (document.getElementById('employeeListActive') as HTMLElement).classList.remove('enable');
    (document.getElementById('employeeListInactive') as HTMLElement).classList.remove('enable');
    filterReset(employees);
})
document.getElementById('employeeListActive')?.addEventListener('click',function(){
    (document.getElementById('employeeListActive') as HTMLElement).classList.add('enable');
    (document.getElementById('employeeListAll') as HTMLElement).classList.remove('enable');
    (document.getElementById('employeeListInactive') as HTMLElement).classList.remove('enable');
    let activeData : any=[];
    activeData=employees.filter((employee : employeeData)=>{
        return employee.status=="Active";
    })
    filterReset(activeData);
})
document.getElementById('employeeListInactive')?.addEventListener('click',function(){
    (document.getElementById('employeeListInactive') as HTMLElement).classList.add('enable');
    (document.getElementById('employeeListAll') as HTMLElement).classList.remove('enable');
    (document.getElementById('employeeListActive') as HTMLElement).classList.remove('enable');
    let inactiveData : any=[];
    inactiveData=employees.filter((employee : employeeData)=>{
        return employee.status=="InActive";
    })
    filterReset(inactiveData);
})

// Edit data in table

function editEmployeeData(empNo : string) : void{
    location.href="addemployee.html?empId="+empNo; 
}


// Delete Selected row

function deleteEmployeeData(empNo : string) : void{
    var checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    for(let i=0;i<checkboxes.length;i++){
        let row=(checkboxes[i].parentNode as HTMLElement).parentNode as HTMLTableRowElement;
        if(row.cells[5].textContent==empNo){
            row.parentNode?.removeChild(row);
        }        
    }
    employees=employees.filter((employee : employeeData)=>{
        if(employee.empNo!=empNo){
            return employee;
        }
    })
    localStorage.setItem('employees',JSON.stringify(employees));
    const deleteDataInTable: HTMLElement | null = document.querySelector('.delete-popup');
        if (deleteDataInTable) {
            deleteDataInTable.style.display = "block";
            setTimeout(function () {
                deleteDataInTable.style.display = "none";
            }, 1000);
        }
}

// Create Multi Select

function multiSelectStatus(){
    let selectBox=document.createElement('div');
    selectBox.classList.add('select-box');
    let optionContainerStatus=document.createElement('div');
    optionContainerStatus.classList.add('option-container1');
    optionContainerStatus.classList.add('option-checkboxes');
    let statusOptions=['Active','InActive'];
    for(let i=0;i<statusOptions.length;i++){
        let statusOnClick=document.createElement('div');
        statusOnClick.setAttribute('onClick','onCheckCheckBox(this,event)');
        let optionDiv=document.createElement('div');
        optionDiv.classList.add('option');
        let inputCheck=document.createElement('input');
        inputCheck.type='checkbox';
        inputCheck.classList.add('check-box1');
        inputCheck.value=statusOptions[i];
        inputCheck.name="Status";
        let optionValue=document.createElement('option');
        optionValue.value=statusOptions[i];
        optionValue.textContent=statusOptions[i];
        optionDiv.appendChild(inputCheck);
        optionDiv.appendChild(optionValue);
        statusOnClick.appendChild(optionDiv);
        optionContainerStatus.appendChild(statusOnClick);
    }
    selectBox.appendChild(optionContainerStatus);
    let statusBtn=document.getElementById('statusDiv');
    statusBtn?.appendChild(selectBox);
    
}

function multiSelectDepartment(){
    let selectBox=document.createElement('div');
    selectBox.classList.add('select-box');
    let optionContainerDepartment=document.createElement('div');
    optionContainerDepartment.classList.add('option-container2');
    optionContainerDepartment.classList.add('option-checkboxes');
    let departmentOptions=['Product Engineer','Human Resources','Quality Analyst','Finance','Infrastructure & Operations'];
    for(let i=0;i<departmentOptions.length;i++){
        let departmentOnClick=document.createElement('div');
        departmentOnClick.setAttribute('onClick','onCheckCheckBox(this,event)');
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
        departmentOnClick.setAttribute('onClick','onCheckCheckBox(this,event)');
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

//Multiselect dropdown

// Option container 1

var selectSearch1=document.getElementById('dropdownImg1') as HTMLElement;
var searchEmployee = document.querySelector('.search-employee1') as HTMLElement;
var options :NodeListOf<HTMLElement> = document.querySelectorAll('.option');
var checkbox1 : NodeListOf<HTMLInputElement> = document.querySelectorAll('.check-box1');

selectSearch1?.addEventListener('click', function () {
    multiSelectStatus();
    (document.querySelector('.option-container1') as HTMLElement).style.display = 'block';
});

searchEmployee?.addEventListener('input', function (this: HTMLInputElement) {
    const searchValue :string = this.value.toLowerCase();
    options.forEach(option => {
        const text: string = option.textContent?.toLowerCase() || '';
        if (text.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});

searchEmployee?.addEventListener('click', function () {
    multiSelectStatus();
    (document.querySelector('.option-container1') as HTMLElement).style.display = 'block';
});

document.addEventListener('click', function (event:Event) {
    if (!(document.querySelector('.search-employee1') as HTMLElement)?.contains(event.target as HTMLElement) && !(document.querySelector('.option-container1') as HTMLElement)?.contains(event.target as HTMLElement) && !(document.getElementById('dropdownImg1') as HTMLElement)?.contains(event.target as HTMLElement)) {
        (document.querySelector('.option-container1') as HTMLElement)?(document.querySelector('.option-container1') as HTMLElement).style.display = 'none':"";
    }
});

// Option container 2

var selectSearch2=document.querySelector('#dropdownImg2') as HTMLElement;
var searchEmployee2 = document.querySelector('.search-employee2') as HTMLElement;
var checkbox2 : NodeListOf<HTMLInputElement> = document.querySelectorAll('.check-box2');

searchEmployee2?.addEventListener('input', function (this : HTMLInputElement) {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        const text: string = option.textContent?.toLowerCase() || '';
        if (text.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});
selectSearch2.addEventListener('click', function () {
    multiSelectDepartment();
    (document.querySelector('.option-container2') as HTMLElement).style.display = 'block';
});
searchEmployee2?.addEventListener('click', function () {
    multiSelectDepartment();
    (document.querySelector('.option-container2') as HTMLElement).style.display = 'block';
});

document.addEventListener('click', function (event:Event) {
    if (!(document.querySelector('.search-employee2') as HTMLElement)?.contains(event.target as HTMLElement) && !(document.querySelector('.option-container2') as HTMLElement)?.contains(event.target as HTMLElement) && !(document.querySelector('#dropdownImg2') as HTMLElement)?.contains(event.target as HTMLElement)) {
        (document.querySelector('.option-container2') as HTMLElement)? (document.querySelector('.option-container2') as HTMLElement).style.display = 'none':"";
    }
});

// Option container 3

var selectSearch3=document.getElementById('dropdownImg3') as HTMLElement;
var searchEmployee3 = document.querySelector('.search-employee3') as HTMLElement;
var checkbox3 : NodeListOf<HTMLInputElement>= document.querySelectorAll('.check-box3');

searchEmployee3?.addEventListener('input', function (this:HTMLInputElement) {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        const text: string = option.textContent?.toLowerCase() || '';
        if (text.includes(searchValue)) {
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
(document.getElementById('dropdownImg3') as HTMLElement)?.addEventListener('click', function () {
    multiSelectLocation();
    (document.querySelector('.option-container3') as HTMLElement).style.display = 'block';
});
document.addEventListener('click', function (event:Event) {
    if (!(document.querySelector('.search-employee3') as HTMLElement)?.contains(event.target as HTMLElement) && !(document.querySelector('.option-container3') as HTMLElement)?.contains(event.target as HTMLElement) && !(document.getElementById('dropdownImg3') as HTMLElement)?.contains(event.target as HTMLElement)) {
        (document.querySelector('.option-container3') as HTMLElement)?(document.querySelector('.option-container3') as HTMLElement).style.display = 'none':"";
    }
});

// Store values of Option container in filterarray

let filterarrayStatus: string[] = [];
let filterarrayDepartment: string[] = [];
let filterarrayLocation: string[] = [];
let statusCount: number = 0;
let departmentCount: number = 0;
let locationCount: number = 0;

const onCheckCheckBox = (element: HTMLElement, event: Event): void => {
    let check = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
    let checkDiv=element.querySelector('.option') as HTMLInputElement;
        let name = check.name;
        let value = check.value;
        console.log(check.checked);
        console.log(check.checked);
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
        if(check.checked) {
            if (name === "Status") {
                filterarrayStatus.push(value);
                statusCount += 1;
                (document.querySelector('.search-employee1') as HTMLInputElement).value = "Status: " + statusCount;
            }
            else if (name === "Department") {
                filterarrayDepartment.push(value);
                departmentCount += 1;
                (document.querySelector('.search-employee2') as HTMLInputElement).value = "Department: " + departmentCount;
            }
            else {
                filterarrayLocation.push(value);
                locationCount += 1;
                (document.querySelector('.search-employee3') as HTMLInputElement).value = "Location: " + locationCount;
            }
        }
        else if(!check.checked){
            if (name === "Status") {
                for (let i = 0; i < filterarrayStatus.length; i++) {
                    if (filterarrayStatus[i] === value) {
                        statusCount -= 1;
                        filterarrayStatus.splice(i, 1);
                    }
                }
                (document.querySelector('.search-employee1') as HTMLInputElement).value = "Status: " + statusCount;
            }
            else if (name === "Department") {
                for (let i = 0; i < filterarrayDepartment.length; i++) {
                    if (filterarrayDepartment[i] === value) {
                        departmentCount -= 1;
                        filterarrayDepartment.splice(i, 1);
                    }
                }
                (document.querySelector('.search-employee2') as HTMLInputElement).value = "Department: " + departmentCount;
            }
            else {
                if (name === "Location") {
                    for (let i = 0; i < filterarrayLocation.length; i++) {
                        if (filterarrayLocation[i] === value) {
                            locationCount -= 1;
                            filterarrayLocation.splice(i, 1);
                        }
                    }
                    (document.querySelector('.search-employee3') as HTMLInputElement).value = "Location: " + locationCount;
                }
            }
        }
}


//Filter data of button clicked

let char: string = "";
let previousCheck: string = "";
let alpha: boolean[] = new Array(26).fill(true);

getAlphabetButtons();

function getAlphabetButtons() {
    let alphabetContainer = document.getElementById("alphabetButtons") as HTMLElement;
    for (let i = 65; i <= 90; i++) {
        let char = String.fromCharCode(i);
        let button = document.createElement("button") as HTMLElement;
        button.classList.add('charButton');
        button.textContent = char;
        button.setAttribute("value", char);
        button.setAttribute("onclick", "filterByAlphabet(this,event)");
        alphabetContainer.appendChild(button);
    }
}

function filterByAlphabet(check: HTMLInputElement, event: Event): void {
    char = check.value;
    if (alpha[char.charCodeAt(0) - 65] === true) {
        alpha[char.charCodeAt(0) - 65] = false;
        (document.querySelector('.filteralphabet-icons') as HTMLElement).classList.add('checkdisplay');
        filterAlphabetClick(check, event);
        alpha[previousCheck.charCodeAt(0) - 65] = true;
    } 
    else if (previousCheck === char) {
        alpha[char.charCodeAt(0) - 65] = true;
        (document.querySelector('.filteralphabet-icons') as HTMLElement).classList.remove('checkdisplay');
        check.classList.remove('clicked');
        char = "";
        previousCheck = "";
        alphabetButtonFilter(event);
    }
    previousCheck = char;
}


function filterAlphabetClick(check : HTMLInputElement,event:Event){
    let btns=document.querySelectorAll('.charButton');
    btns.forEach(btn=>{
        btn.classList.remove('clicked');
    })
     char = check.value;
     check.classList.add('clicked');
     alphabetButtonFilter(event);
}

//Code for dropdown filter

function displayResult(event : Event) {
    alphabetButtonFilter(event);
}
function displayReset() {
    let btns=document.querySelectorAll('.charButton');
    char="";
    btns.forEach(btn=>{
        btn.classList.remove('clicked');
    })
    checkbox1.forEach((check : HTMLInputElement) => {
        if (check.checked) {
            check.checked = false;
            statusCount--;
        }
    });
    checkbox2.forEach((check : HTMLInputElement)=>{
        if(check.checked){
            check.checked=false;
            departmentCount--;
        }
    })
    checkbox3.forEach((check : HTMLInputElement)=>{
        if(check.checked){
            check.checked=false;
            locationCount--;
        }
    })
    document.querySelector('.search-employee1')?(document.querySelector('.search-employee1') as HTMLInputElement).value="" : "";
    document.querySelector('.search-employee2')?(document.querySelector('.search-employee2') as HTMLInputElement).value="" : "";
    document.querySelector('.search-employee3')?(document.querySelector('.search-employee3') as HTMLInputElement).value="" : "";
    filterarrayStatus = [];
    filterarrayDepartment = [];
    filterarrayLocation = [];
    filterReset(employees);
}
let alphabetFilter :any=[];
let statusFilter: any = [];
let departmentFilter: any = [];
let locationFilter: any = [];
function alphabetButtonFilter(event:Event){
    let applybutton=document.querySelector('.apply-button') as HTMLInputElement;    
    if(applybutton?.contains(event.target as HTMLElement)){        
        statusFilter=employees.filter((employee : employeeData)=>{
            if(filterarrayStatus.length==0){
                return employee;
            }
            else if(filterarrayStatus.includes(employee.status)){
                return employee;
            }
        })
        departmentFilter=statusFilter.filter((employee : employeeData)=>{
            if(filterarrayDepartment.length==0){
                return employee;
            }
            else if(filterarrayDepartment.includes(employee.department)){
                return employee;
            }
        })
        locationFilter=departmentFilter.filter((employee : employeeData)=>{
            if(filterarrayLocation.length==0){
                return employee;
            }
            else if(filterarrayLocation.includes(employee.location)){
                return employee;
            }
        })
        alphabetFilter=locationFilter.filter((employee : employeeData)=>{
            if(char==""){
                return employee;
            }
            else if(employee.firstName.charAt(0).toUpperCase()==char){
                return employee;
            }
        })
    }
    else if(locationFilter.length!=0){
        alphabetFilter=locationFilter.filter((employee : employeeData)=>{
            if(char==""){
                return employee;
            }
            else if(employee.firstName.charAt(0).toUpperCase()==char){
                return employee;
            }
        })
    }
    else{
        alphabetFilter=employees.filter((employee : employeeData)=>{
            if(char==""){
                return employee;
            }
            else if(employee.firstName.charAt(0).toUpperCase()==char){
                return employee;
            }
        })
    }
    
    filterReset(alphabetFilter);
}

function filterReset(results : employeeData[]) {
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
function sortData(val : number) {
    const table = document.getElementById('employeetable') as HTMLTableElement;
    const tableData = table.querySelector('#tableEmployee') as HTMLTableElement;
    let tableRows = Array.from(tableData.querySelectorAll('.table-row'));    
    if(sortDataEmp[val]=="asc"){
        sortDataEmp[val]="dsc";
        tableRows.sort((a, b) => {
            const aval: string = (a.querySelectorAll('.details')[val] as HTMLElement).textContent?.trim() || '';
            const bval: string = (b.querySelectorAll('.details')[val] as HTMLElement).textContent?.trim() || '';
            return aval.localeCompare(bval);
        });
    }
    else{
        sortDataEmp[val]="asc";
        tableRows.sort((a, b) => {
            const aval: string = (a.querySelectorAll('.details')[val] as HTMLElement).textContent?.trim() || '';
            const bval: string = (b.querySelectorAll('.details')[val] as HTMLElement).textContent?.trim() || '';
            return bval.localeCompare(aval);
        });
    }
    
    tableData.innerHTML = '';
    tableRows.forEach(row => {
        tableData.append(row);
    })
}

// Delete all rows

let deleteBtn = document.getElementById('deleteBtn') as HTMLInputElement;
deleteBtn.classList.remove('enable-delete');
let checkCount=0,checkAll=0;
document.querySelector('.check-box-thead input')?.addEventListener('click',function(){
    checkCount++;
    let checkboxes : NodeListOf<HTMLElement>= document.querySelectorAll("#tableEmployee .check-box input");
    for(let i=0;i<checkboxes.length;i++){   
        const checkbox = checkboxes[i] as HTMLInputElement;
        if (checkbox.checked == true && checkCount%2==0) {
            checkbox.checked = false;
            deleteBtn.classList.remove('enable-delete');
            dataUncheck = [];
        }
        else {
            checkbox.checked = true;
            let row = (checkboxes[i].parentNode as HTMLElement).parentNode as HTMLTableRowElement;
            dataUncheck.push(row.cells[5].textContent || '');
            deleteBtn.disabled = false;
            deleteBtn.classList.add('enable-delete');
        }
    }
    checkAll=1;
});


function checkDeleteRow(){
    let checkboxes : NodeListOf<HTMLElement>= document.querySelectorAll("#tableEmployee .check-box input");
    let cnt=0;
    for(let i=0;i<checkboxes.length;i++){
        const checkbox = checkboxes[i] as HTMLInputElement;
        let row = (checkboxes[i].parentNode as HTMLElement).parentNode as HTMLTableRowElement;
        if(checkbox.checked==false){
            cnt++;
            for(let j=0;j<dataUncheck.length;j++){
                if(dataUncheck[j]==row.cells[5].textContent){
                    dataUncheck.splice(j,1);
                }
            }
        }
    }
    if(cnt>=1){
        (document.querySelector('.check-box-thead input') as HTMLInputElement).checked=false;
    }
    if(cnt==0){
        (document.querySelector('.check-box-thead input') as HTMLInputElement).checked=true;
    }
    if(cnt==checkboxes.length){
        if(deleteBtn){
            deleteBtn.classList.remove('enable-delete');
            checkAll=0;
        }
    }
}

//Delete row

var count = 0;

if (deleteBtn?.disabled == true || count == 0) {
    if(deleteBtn){
        deleteBtn.classList.remove('enable-delete');
    }
}
function deleteSelectedRows() {
    if(deleteBtn){
        deleteBtn.classList.remove('enable-delete');
    }
    var checkboxes = document.querySelectorAll("#tableEmployee .check-box input") as NodeListOf<HTMLInputElement>;
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        let check = checkboxes[i] as HTMLInputElement;
        if (check.checked) {
            var row = (check.parentNode as HTMLElement).parentNode as HTMLTableRowElement; // Get the parent row
            (row.parentNode as HTMLElement).removeChild(row); // Remove the row  
        }
    }
    (document.querySelector('.check-box-thead') as HTMLInputElement).checked=false;
    employees = employees.filter((employee : employeeData) => {   
        if(!dataUncheck.includes(employee.empNo)){
            return employee;
        }
    });   
    localStorage.setItem('employees', JSON.stringify(employees));
    const deleteDataInTable: HTMLElement | null = document.querySelector('.delete-popup');
        if (deleteDataInTable) {
            deleteDataInTable.style.display = "block";
            setTimeout(function () {
                deleteDataInTable.style.display = "none";
            }, 1000);
        }
}

function ischecked(check : HTMLInputElement,empid : string) {
    if(checkAll==1)checkDeleteRow();
    else{
        if (check.checked == false) {
            count--;
            for(let i=0;i<dataUncheck.length;i++){
                if(dataUncheck[i]==empid){
                    dataUncheck.splice(i,1);
                }
            }
        }
        else if (check.checked) {
            ++count;
            dataUncheck.push(empid);
            (document.getElementById('deleteBtn') as HTMLInputElement).disabled = false;
            deleteBtn.classList.add('enable-delete');
        }
        if (deleteBtn.disabled == true || count == 0) {
            if(deleteBtn){
                deleteBtn.classList.remove('enable-delete');
            }
        } 
    }       
}

// Export table to Excel sheet

function exportData(): void {
    const tableBody: HTMLTableElement = document.getElementById("tableEmployee") as HTMLTableElement;
    const data: string[][] = Array.from(tableBody.querySelectorAll('.table-row')).map(row => {
        return Array.from(row.querySelectorAll('.details')).map(cell => cell.textContent || "");
    });
    const csv: string = data.map(row => row.join(',')).join('\n');
    const blob: Blob = new Blob([csv], { type: 'text/csv' });
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tableData.csv';
    link.click();
}
