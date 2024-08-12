"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var employeesJSON = localStorage.getItem('employees');
var employees = employeesJSON ? JSON.parse(employeesJSON) : [];
var rolesJSON = localStorage.getItem('roles');
var roles = rolesJSON ? JSON.parse(rolesJSON) : [];
// Search data from table
document.querySelector('.searchBar input').addEventListener('input', function () {
    let searchText = this.value.toLowerCase();
    console.log(searchText);
    let searchTableData = [];
    employees.forEach((employee) => {
        if (employee.firstName.toLowerCase().includes(searchText)) {
            //return employee;
            searchTableData.push(employee);
        }
    });
    filterReset(searchTableData);
});
// Display filter row
var dataUncheck = [];
let filterDataVar = true;
function filterData() {
    if (filterDataVar == false) {
        document.getElementById("filterDataCategory").style.display = "flex";
    }
    else {
        document.getElementById("filterDataCategory").style.display = "none";
    }
    filterDataVar = !filterDataVar;
}
//To display sidepanel all,active,inactive
var displayData = true;
function displayDataList() {
    if (displayData == true) {
        document.getElementById('employee-content-list') ? document.getElementById('employee-content-list').style.display = 'block' : "";
    }
    else {
        document.getElementById('employee-content-list') ? document.getElementById('employee-content-list').style.display = 'none' : "";
    }
    displayData = !displayData;
}
;
//creating each row in the table
function createRow(employee) {
    const row = document.createElement('tr');
    row.classList.add('table-row');
    const rowdata = [
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
    employees.forEach((employee) => {
        const row = createRow(employee);
        tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(row);
    });
};
function createCheckBox(employee) {
    const data = document.createElement('td');
    data.classList.add('check-box');
    const inp = document.createElement('input');
    inp.setAttribute('type', 'checkbox');
    inp.setAttribute('onClick', 'ischecked(this,"' + employee.empNo + '")');
    data.append(inp);
    return data;
}
function createUser(employee) {
    const data = document.createElement('td');
    data.classList.add('details');
    const tableDetail = document.createElement('table');
    const trImageName = document.createElement('tr');
    trImageName.classList.add('profile-pic');
    const tdImage = document.createElement('td');
    tdImage.classList.add('tab1-details-tr');
    tdImage.rowSpan = 2;
    const image = document.createElement('img');
    image.setAttribute('src', employee.profileImg);
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
function createTableCell(text) {
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
    if (text == "Active") {
        btn.classList.add('activeBtn');
    }
    else {
        btn.classList.add('inactiveBtn');
    }
    data.appendChild(btn);
    return data;
}
function createJoinDate(text) {
    const data = document.createElement('td');
    data.classList.add('details');
    data.textContent = text;
    return data;
}
function createMenu(employee) {
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
    editEmployee.setAttribute('onClick', 'editEmployeeData("' + employee.empNo + '")');
    menuOption.appendChild(editEmployee);
    const deleteEmployee = document.createElement('li');
    deleteEmployee.textContent = 'Delete';
    deleteEmployee.classList.add('delete');
    deleteEmployee.setAttribute('onClick', 'deleteEmployeeData("' + employee.empNo + '")');
    menuOption.appendChild(deleteEmployee);
    data.appendChild(menuOption);
    return data;
}
// Display All,Active,Inactive pages when on click
(_a = document.getElementById('employeeListAll')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    document.getElementById('employeeListAll').classList.add('enable');
    document.getElementById('employeeListActive').classList.remove('enable');
    document.getElementById('employeeListInactive').classList.remove('enable');
    filterReset(employees);
});
(_b = document.getElementById('employeeListActive')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    document.getElementById('employeeListActive').classList.add('enable');
    document.getElementById('employeeListAll').classList.remove('enable');
    document.getElementById('employeeListInactive').classList.remove('enable');
    let activeData = [];
    activeData = employees.filter((employee) => {
        return employee.status == "Active";
    });
    filterReset(activeData);
});
(_c = document.getElementById('employeeListInactive')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    document.getElementById('employeeListInactive').classList.add('enable');
    document.getElementById('employeeListAll').classList.remove('enable');
    document.getElementById('employeeListActive').classList.remove('enable');
    let inactiveData = [];
    inactiveData = employees.filter((employee) => {
        return employee.status == "InActive";
    });
    filterReset(inactiveData);
});
// Edit data in table
function editEmployeeData(empNo) {
    location.href = "addemployee.html?empId=" + empNo;
}
// Delete Selected row
function deleteEmployeeData(empNo) {
    var _a;
    var checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    for (let i = 0; i < checkboxes.length; i++) {
        let row = checkboxes[i].parentNode.parentNode;
        if (row.cells[5].textContent == empNo) {
            (_a = row.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(row);
        }
    }
    employees = employees.filter((employee) => {
        if (employee.empNo != empNo) {
            return employee;
        }
    });
    localStorage.setItem('employees', JSON.stringify(employees));
    const deleteDataInTable = document.querySelector('.delete-popup');
    if (deleteDataInTable) {
        deleteDataInTable.style.display = "block";
        setTimeout(function () {
            deleteDataInTable.style.display = "none";
        }, 1000);
    }
}
// Create Multi Select
function multiSelectStatus() {
    let selectBox = document.createElement('div');
    selectBox.classList.add('select-box');
    let optionContainerStatus = document.createElement('div');
    optionContainerStatus.classList.add('option-container1');
    optionContainerStatus.classList.add('option-checkboxes');
    let statusOptions = ['Active', 'InActive'];
    for (let i = 0; i < statusOptions.length; i++) {
        let statusOnClick = document.createElement('div');
        statusOnClick.setAttribute('onClick', 'onCheckCheckBox(this,event)');
        let optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        let inputCheck = document.createElement('input');
        inputCheck.type = 'checkbox';
        inputCheck.classList.add('check-box1');
        inputCheck.value = statusOptions[i];
        inputCheck.name = "Status";
        let optionValue = document.createElement('option');
        optionValue.value = statusOptions[i];
        optionValue.textContent = statusOptions[i];
        optionDiv.appendChild(inputCheck);
        optionDiv.appendChild(optionValue);
        statusOnClick.appendChild(optionDiv);
        optionContainerStatus.appendChild(statusOnClick);
    }
    selectBox.appendChild(optionContainerStatus);
    let statusBtn = document.getElementById('statusDiv');
    statusBtn === null || statusBtn === void 0 ? void 0 : statusBtn.appendChild(selectBox);
}
function multiSelectDepartment() {
    let selectBox = document.createElement('div');
    selectBox.classList.add('select-box');
    let optionContainerDepartment = document.createElement('div');
    optionContainerDepartment.classList.add('option-container2');
    optionContainerDepartment.classList.add('option-checkboxes');
    let departmentOptions = ['Product Engineer', 'Human Resources', 'Quality Analyst', 'Finance', 'Infrastructure & Operations'];
    for (let i = 0; i < departmentOptions.length; i++) {
        let departmentOnClick = document.createElement('div');
        departmentOnClick.setAttribute('onClick', 'onCheckCheckBox(this,event)');
        let optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        let inputCheck = document.createElement('input');
        inputCheck.type = 'checkbox';
        inputCheck.classList.add('check-box2');
        inputCheck.value = departmentOptions[i];
        inputCheck.name = "Department";
        let optionValue = document.createElement('option');
        optionValue.value = departmentOptions[i];
        optionValue.textContent = departmentOptions[i];
        optionDiv.appendChild(inputCheck);
        optionDiv.appendChild(optionValue);
        departmentOnClick.appendChild(optionDiv);
        optionContainerDepartment.appendChild(departmentOnClick);
    }
    selectBox.appendChild(optionContainerDepartment);
    let statusBtn = document.getElementById('departmentDiv');
    statusBtn === null || statusBtn === void 0 ? void 0 : statusBtn.appendChild(selectBox);
}
function multiSelectLocation() {
    let selectBox = document.createElement('div');
    selectBox.classList.add('select-box');
    let optionContainerLocation = document.createElement('div');
    optionContainerLocation.classList.add('option-container3');
    optionContainerLocation.classList.add('option-checkboxes');
    let locationOptions = ['Hyderabad', 'Banglore', 'Chennai'];
    for (let i = 0; i < locationOptions.length; i++) {
        let departmentOnClick = document.createElement('div');
        departmentOnClick.setAttribute('onClick', 'onCheckCheckBox(this,event)');
        let optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        let inputCheck = document.createElement('input');
        inputCheck.type = 'checkbox';
        inputCheck.classList.add('check-box3');
        inputCheck.value = locationOptions[i];
        inputCheck.name = "Location";
        let optionValue = document.createElement('option');
        optionValue.value = locationOptions[i];
        optionValue.textContent = locationOptions[i];
        optionDiv.appendChild(inputCheck);
        optionDiv.appendChild(optionValue);
        departmentOnClick.appendChild(optionDiv);
        optionContainerLocation.appendChild(departmentOnClick);
    }
    selectBox.appendChild(optionContainerLocation);
    let statusBtn = document.getElementById('locationDiv');
    statusBtn === null || statusBtn === void 0 ? void 0 : statusBtn.appendChild(selectBox);
}
//Multiselect dropdown
// Option container 1
var selectSearch1 = document.getElementById('dropdownImg1');
var searchEmployee = document.querySelector('.search-employee1');
var options = document.querySelectorAll('.option');
var checkbox1 = document.querySelectorAll('.check-box1');
selectSearch1 === null || selectSearch1 === void 0 ? void 0 : selectSearch1.addEventListener('click', function () {
    multiSelectStatus();
    document.querySelector('.option-container1').style.display = 'block';
});
searchEmployee === null || searchEmployee === void 0 ? void 0 : searchEmployee.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        var _a;
        const text = ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        if (text.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});
searchEmployee === null || searchEmployee === void 0 ? void 0 : searchEmployee.addEventListener('click', function () {
    multiSelectStatus();
    document.querySelector('.option-container1').style.display = 'block';
});
document.addEventListener('click', function (event) {
    var _a, _b, _c;
    if (!((_a = document.querySelector('.search-employee1')) === null || _a === void 0 ? void 0 : _a.contains(event.target)) && !((_b = document.querySelector('.option-container1')) === null || _b === void 0 ? void 0 : _b.contains(event.target)) && !((_c = document.getElementById('dropdownImg1')) === null || _c === void 0 ? void 0 : _c.contains(event.target))) {
        document.querySelector('.option-container1') ? document.querySelector('.option-container1').style.display = 'none' : "";
    }
});
// Option container 2
var selectSearch2 = document.querySelector('#dropdownImg2');
var searchEmployee2 = document.querySelector('.search-employee2');
var checkbox2 = document.querySelectorAll('.check-box2');
searchEmployee2 === null || searchEmployee2 === void 0 ? void 0 : searchEmployee2.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        var _a;
        const text = ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
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
    document.querySelector('.option-container2').style.display = 'block';
});
searchEmployee2 === null || searchEmployee2 === void 0 ? void 0 : searchEmployee2.addEventListener('click', function () {
    multiSelectDepartment();
    document.querySelector('.option-container2').style.display = 'block';
});
document.addEventListener('click', function (event) {
    var _a, _b, _c;
    if (!((_a = document.querySelector('.search-employee2')) === null || _a === void 0 ? void 0 : _a.contains(event.target)) && !((_b = document.querySelector('.option-container2')) === null || _b === void 0 ? void 0 : _b.contains(event.target)) && !((_c = document.querySelector('#dropdownImg2')) === null || _c === void 0 ? void 0 : _c.contains(event.target))) {
        document.querySelector('.option-container2') ? document.querySelector('.option-container2').style.display = 'none' : "";
    }
});
// Option container 3
var selectSearch3 = document.getElementById('dropdownImg3');
var searchEmployee3 = document.querySelector('.search-employee3');
var checkbox3 = document.querySelectorAll('.check-box3');
searchEmployee3 === null || searchEmployee3 === void 0 ? void 0 : searchEmployee3.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    options.forEach(option => {
        var _a;
        const text = ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        if (text.includes(searchValue)) {
            option.style.display = 'flex';
        }
        else {
            option.style.display = 'none';
        }
    });
});
searchEmployee3 === null || searchEmployee3 === void 0 ? void 0 : searchEmployee3.addEventListener('click', function () {
    multiSelectLocation();
    document.querySelector('.option-container3').style.display = 'block';
});
(_d = document.getElementById('dropdownImg3')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    multiSelectLocation();
    document.querySelector('.option-container3').style.display = 'block';
});
document.addEventListener('click', function (event) {
    var _a, _b, _c;
    if (!((_a = document.querySelector('.search-employee3')) === null || _a === void 0 ? void 0 : _a.contains(event.target)) && !((_b = document.querySelector('.option-container3')) === null || _b === void 0 ? void 0 : _b.contains(event.target)) && !((_c = document.getElementById('dropdownImg3')) === null || _c === void 0 ? void 0 : _c.contains(event.target))) {
        document.querySelector('.option-container3') ? document.querySelector('.option-container3').style.display = 'none' : "";
    }
});
// Store values of Option container in filterarray
let filterarrayStatus = [];
let filterarrayDepartment = [];
let filterarrayLocation = [];
let statusCount = 0;
let departmentCount = 0;
let locationCount = 0;
const onCheckCheckBox = (element, event) => {
    let check = element.querySelector('input[type="checkbox"]');
    let checkDiv = element.querySelector('.option');
    let name = check.name;
    let value = check.value;
    console.log(check.checked);
    console.log(check.checked);
    if (checkDiv === null || checkDiv === void 0 ? void 0 : checkDiv.contains(event.target)) {
        if (check.checked) {
            check.checked = false;
        }
        else {
            check.checked = true;
        }
    }
    if (check.contains(event.target)) {
        if (check.checked) {
            check.checked = false;
        }
        else {
            check.checked = true;
        }
    }
    if (check.checked) {
        if (name === "Status") {
            filterarrayStatus.push(value);
            statusCount += 1;
            document.querySelector('.search-employee1').value = "Status: " + statusCount;
        }
        else if (name === "Department") {
            filterarrayDepartment.push(value);
            departmentCount += 1;
            document.querySelector('.search-employee2').value = "Department: " + departmentCount;
        }
        else {
            filterarrayLocation.push(value);
            locationCount += 1;
            document.querySelector('.search-employee3').value = "Location: " + locationCount;
        }
    }
    else if (!check.checked) {
        if (name === "Status") {
            for (let i = 0; i < filterarrayStatus.length; i++) {
                if (filterarrayStatus[i] === value) {
                    statusCount -= 1;
                    filterarrayStatus.splice(i, 1);
                }
            }
            document.querySelector('.search-employee1').value = "Status: " + statusCount;
        }
        else if (name === "Department") {
            for (let i = 0; i < filterarrayDepartment.length; i++) {
                if (filterarrayDepartment[i] === value) {
                    departmentCount -= 1;
                    filterarrayDepartment.splice(i, 1);
                }
            }
            document.querySelector('.search-employee2').value = "Department: " + departmentCount;
        }
        else {
            if (name === "Location") {
                for (let i = 0; i < filterarrayLocation.length; i++) {
                    if (filterarrayLocation[i] === value) {
                        locationCount -= 1;
                        filterarrayLocation.splice(i, 1);
                    }
                }
                document.querySelector('.search-employee3').value = "Location: " + locationCount;
            }
        }
    }
};
//Filter data of button clicked
let char = "";
let previousCheck = "";
let alpha = new Array(26).fill(true);
getAlphabetButtons();
function getAlphabetButtons() {
    let alphabetContainer = document.getElementById("alphabetButtons");
    for (let i = 65; i <= 90; i++) {
        let char = String.fromCharCode(i);
        let button = document.createElement("button");
        button.classList.add('charButton');
        button.textContent = char;
        button.setAttribute("value", char);
        button.setAttribute("onclick", "filterByAlphabet(this,event)");
        alphabetContainer.appendChild(button);
    }
}
function filterByAlphabet(check, event) {
    char = check.value;
    if (alpha[char.charCodeAt(0) - 65] === true) {
        alpha[char.charCodeAt(0) - 65] = false;
        document.querySelector('.filteralphabet-icons').classList.add('checkdisplay');
        filterAlphabetClick(check, event);
        alpha[previousCheck.charCodeAt(0) - 65] = true;
    }
    else if (previousCheck === char) {
        alpha[char.charCodeAt(0) - 65] = true;
        document.querySelector('.filteralphabet-icons').classList.remove('checkdisplay');
        check.classList.remove('clicked');
        char = "";
        previousCheck = "";
        alphabetButtonFilter(event);
    }
    previousCheck = char;
}
function filterAlphabetClick(check, event) {
    let btns = document.querySelectorAll('.charButton');
    btns.forEach(btn => {
        btn.classList.remove('clicked');
    });
    char = check.value;
    check.classList.add('clicked');
    alphabetButtonFilter(event);
}
//Code for dropdown filter
function displayResult(event) {
    alphabetButtonFilter(event);
}
function displayReset() {
    let btns = document.querySelectorAll('.charButton');
    char = "";
    btns.forEach(btn => {
        btn.classList.remove('clicked');
    });
    checkbox1.forEach((check) => {
        if (check.checked) {
            check.checked = false;
            statusCount--;
        }
    });
    checkbox2.forEach((check) => {
        if (check.checked) {
            check.checked = false;
            departmentCount--;
        }
    });
    checkbox3.forEach((check) => {
        if (check.checked) {
            check.checked = false;
            locationCount--;
        }
    });
    document.querySelector('.search-employee1') ? document.querySelector('.search-employee1').value = "" : "";
    document.querySelector('.search-employee2') ? document.querySelector('.search-employee2').value = "" : "";
    document.querySelector('.search-employee3') ? document.querySelector('.search-employee3').value = "" : "";
    filterarrayStatus = [];
    filterarrayDepartment = [];
    filterarrayLocation = [];
    filterReset(employees);
}
let alphabetFilter = [];
let statusFilter = [];
let departmentFilter = [];
let locationFilter = [];
function alphabetButtonFilter(event) {
    let applybutton = document.querySelector('.apply-button');
    if (applybutton === null || applybutton === void 0 ? void 0 : applybutton.contains(event.target)) {
        statusFilter = employees.filter((employee) => {
            if (filterarrayStatus.length == 0) {
                return employee;
            }
            else if (filterarrayStatus.includes(employee.status)) {
                return employee;
            }
        });
        departmentFilter = statusFilter.filter((employee) => {
            if (filterarrayDepartment.length == 0) {
                return employee;
            }
            else if (filterarrayDepartment.includes(employee.department)) {
                return employee;
            }
        });
        locationFilter = departmentFilter.filter((employee) => {
            if (filterarrayLocation.length == 0) {
                return employee;
            }
            else if (filterarrayLocation.includes(employee.location)) {
                return employee;
            }
        });
        alphabetFilter = locationFilter.filter((employee) => {
            if (char == "") {
                return employee;
            }
            else if (employee.firstName.charAt(0).toUpperCase() == char) {
                return employee;
            }
        });
    }
    else if (locationFilter.length != 0) {
        alphabetFilter = locationFilter.filter((employee) => {
            if (char == "") {
                return employee;
            }
            else if (employee.firstName.charAt(0).toUpperCase() == char) {
                return employee;
            }
        });
    }
    else {
        alphabetFilter = employees.filter((employee) => {
            if (char == "") {
                return employee;
            }
            else if (employee.firstName.charAt(0).toUpperCase() == char) {
                return employee;
            }
        });
    }
    filterReset(alphabetFilter);
}
function filterReset(results) {
    let filtereddata = document.getElementById("tableEmployee");
    filtereddata ? filtereddata.innerHTML = '' : "";
    const tableBody = document.getElementById('tableEmployee');
    results.forEach(result => {
        let filteredData = createRow(result);
        tableBody ? tableBody.appendChild(filteredData) : "";
    });
}
//Sort data according to column
let sortDataEmp = new Array(7).fill("asc");
function sortData(val) {
    const table = document.getElementById('employeetable');
    const tableData = table.querySelector('#tableEmployee');
    let tableRows = Array.from(tableData.querySelectorAll('.table-row'));
    if (sortDataEmp[val] == "asc") {
        sortDataEmp[val] = "dsc";
        tableRows.sort((a, b) => {
            var _a, _b;
            const aval = ((_a = a.querySelectorAll('.details')[val].textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            const bval = ((_b = b.querySelectorAll('.details')[val].textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
            return aval.localeCompare(bval);
        });
    }
    else {
        sortDataEmp[val] = "asc";
        tableRows.sort((a, b) => {
            var _a, _b;
            const aval = ((_a = a.querySelectorAll('.details')[val].textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            const bval = ((_b = b.querySelectorAll('.details')[val].textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
            return bval.localeCompare(aval);
        });
    }
    tableData.innerHTML = '';
    tableRows.forEach(row => {
        tableData.append(row);
    });
}
// Delete all rows
let deleteBtn = document.getElementById('deleteBtn');
deleteBtn.classList.remove('enable-delete');
let checkCount = 0, checkAll = 0;
(_e = document.querySelector('.check-box-thead input')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    checkCount++;
    let checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked == true && checkCount % 2 == 0) {
            checkbox.checked = false;
            deleteBtn.classList.remove('enable-delete');
            dataUncheck = [];
        }
        else {
            checkbox.checked = true;
            let row = checkboxes[i].parentNode.parentNode;
            dataUncheck.push(row.cells[5].textContent || '');
            deleteBtn.disabled = false;
            deleteBtn.classList.add('enable-delete');
        }
    }
    checkAll = 1;
});
function checkDeleteRow() {
    let checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    let cnt = 0;
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        let row = checkboxes[i].parentNode.parentNode;
        if (checkbox.checked == false) {
            cnt++;
            for (let j = 0; j < dataUncheck.length; j++) {
                if (dataUncheck[j] == row.cells[5].textContent) {
                    dataUncheck.splice(j, 1);
                }
            }
        }
    }
    if (cnt >= 1) {
        document.querySelector('.check-box-thead input').checked = false;
    }
    if (cnt == 0) {
        document.querySelector('.check-box-thead input').checked = true;
    }
    if (cnt == checkboxes.length) {
        if (deleteBtn) {
            deleteBtn.classList.remove('enable-delete');
            checkAll = 0;
        }
    }
}
//Delete row
var count = 0;
if ((deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.disabled) == true || count == 0) {
    if (deleteBtn) {
        deleteBtn.classList.remove('enable-delete');
    }
}
function deleteSelectedRows() {
    if (deleteBtn) {
        deleteBtn.classList.remove('enable-delete');
    }
    var checkboxes = document.querySelectorAll("#tableEmployee .check-box input");
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        let check = checkboxes[i];
        if (check.checked) {
            var row = check.parentNode.parentNode; // Get the parent row
            row.parentNode.removeChild(row); // Remove the row  
        }
    }
    document.querySelector('.check-box-thead').checked = false;
    employees = employees.filter((employee) => {
        if (!dataUncheck.includes(employee.empNo)) {
            return employee;
        }
    });
    localStorage.setItem('employees', JSON.stringify(employees));
    const deleteDataInTable = document.querySelector('.delete-popup');
    if (deleteDataInTable) {
        deleteDataInTable.style.display = "block";
        setTimeout(function () {
            deleteDataInTable.style.display = "none";
        }, 1000);
    }
}
function ischecked(check, empid) {
    if (checkAll == 1)
        checkDeleteRow();
    else {
        if (check.checked == false) {
            count--;
            for (let i = 0; i < dataUncheck.length; i++) {
                if (dataUncheck[i] == empid) {
                    dataUncheck.splice(i, 1);
                }
            }
        }
        else if (check.checked) {
            ++count;
            dataUncheck.push(empid);
            document.getElementById('deleteBtn').disabled = false;
            deleteBtn.classList.add('enable-delete');
        }
        if (deleteBtn.disabled == true || count == 0) {
            if (deleteBtn) {
                deleteBtn.classList.remove('enable-delete');
            }
        }
    }
}
// Export table to Excel sheet
function exportData() {
    const tableBody = document.getElementById("tableEmployee");
    const data = Array.from(tableBody.querySelectorAll('.table-row')).map(row => {
        return Array.from(row.querySelectorAll('.details')).map(cell => cell.textContent || "");
    });
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tableData.csv';
    link.click();
}
