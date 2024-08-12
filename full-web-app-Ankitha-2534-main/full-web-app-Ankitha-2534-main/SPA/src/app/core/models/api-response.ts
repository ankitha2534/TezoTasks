export class ApiResponse<T>{
    isSuccess : boolean = false;
    message : string = "";
    token?: string= "";
    data? : T = undefined;
}