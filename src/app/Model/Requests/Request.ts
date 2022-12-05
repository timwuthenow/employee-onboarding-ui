export interface ComputerRequestWrapper
{
    "com.deluxedemo.deluxemodels.ComputerRequest" : ComputerRequest
}

export interface ComputerRequest
{
    cpu? : string,
    ram? : string,
    screensize? : string,
    operatingSystem? : string,
    price? : number,
    type? : string,
    hardware? : string
}

export interface Insert {
    object?: Object;
    "out-identifier"?: string;
    "return-object"?: boolean;
}

export interface FireAllRules {
}

export interface GetObjects {
    "out-identifier"?: string;
}



export interface Command {
    insert?: Insert;
    "fire-all-rules"?: FireAllRules;
    "get-objects"?: GetObjects;
    "set-focus"? : string;
}

export interface RootObject {
    lookup: string;
    commands?: Command[];
}

export interface ServiceRequest
{
    request : Object;
}

export interface ServiceResponse
{
    response : Object;
}


export interface Employee
{
    annualSalary? : number,
    assignedMachine? : ComputerRequestWrapper,
    contact? : ContactWrapper,
    dateofHire? : DateWrapper,
    emailAddress? : string,
    employeeId? : number,
    hourlyRate? : number,
    location? : string,
    name? : string,
    requestedMachine? : ComputerRequestWrapper,
    role? : string,
    type? : string,
    comments? : string

}

export interface DateWrapper
{
    "java.util.Date" : number
}

export interface EmployeeWrapper
{
    "com.deluxedemo.deluxemodels.Employee" : Employee
}



export interface Contact
{
    address? : string,
    city? : string,
    zipcode? : string
}

export interface ContactWrapper
{
    "com.deluxedemo.deluxemodels.Contact" : Contact
}



export interface ProcessInstanceData
{
    employeeRequest? : EmployeeWrapper;
}

export interface ProcessInstanceList extends Employee
{
    processInstanceId : number,
    status : string,
    startedDate : number
}

export interface TaskInstance {
    processInstanceId : number,
    taskId : number;
    taskName : string;
    taskSubject : string;
    taskDescription? : string;
    taskCreatedDate : number;
}

export interface TaskInstanceList
{
    instanceList : TaskInstance[]
}

export interface TaskData {
    employeeRequest : Employee,
    comments : string,
    managerApprove : boolean
}