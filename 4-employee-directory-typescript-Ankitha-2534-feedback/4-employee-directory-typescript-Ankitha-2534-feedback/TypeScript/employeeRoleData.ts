export class employeeData{
    profileImg: string;
    empNo! : string;
    firstName! : string;
    lastName! : string;
    dob! : string;
    email! : string;
    mobileNumber! : string;
    joinDate! : string;
    location! : string;
    role! : string;
    department! : string;
    manager! : string;
    project! : string;
    status! : string;
    constructor(){
        this.profileImg='Images/profile-user.png';
    }
}

export class roleDataRow{
    newRole! : string;
    departmentRole! : string;
    description! : string;
    locationRole! : string;
    checkedRoleDetails! : employeeData[];
}
export interface IamIdiot{
    newrole:string;
}