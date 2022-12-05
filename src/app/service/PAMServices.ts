import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { KieSettings } from '../Model/KieSettings/KieSettings';
import { ComputerRequest, ServiceRequest , ProcessInstanceData, Employee, ComputerRequestWrapper, EmployeeWrapper} from '../Model/Requests/Request';
import { RootObject, Command, Insert } from '../Model/Requests/Request';
import { Credentials } from '../Model/UserRole';

@Injectable({ providedIn: 'root' })
export class PAMServices {

  private kieSettings: KieSettings;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.kieSettings = <KieSettings>this.cookieService.getObject("DeluxeKieSettings")
    if (this.kieSettings === undefined) {
      this.kieSettings = {
        baseurl: "http://localhost:8080/kie-server",
        dmcontainerAlias: "DeluxeRules",
        picontainerAlias: "DeluxeProcess",
        processId: "DeluxeProcess.EmployeeOnboarding",
        username: "bamAdmin",
        password: "ibmpam1!",
        isOpenShift: false
      };
    }
  }

  updateKieSettings(kieSettings: KieSettings) {
    this.kieSettings = kieSettings;
    this.cookieService.putObject("DeluxeKieSettings", this.kieSettings);
  }

  getCurrentKieSettings(): KieSettings {
    return this.kieSettings;
  }

  getPrice(requestComputer : ComputerRequestWrapper,request : ServiceRequest,ruleFlowGroup? : string)
  {
    let postObject: RootObject = { lookup: "stateless-session" };

    let commandList: Command[] = [];
    let insertCommand1: Command = {};
    let insertCommand2: Command = {};
    let insertCommand3: Command = {};
    let insertCommand4: Command = {};

    let insert1Obj: Insert = {};
    insert1Obj = {
      object: requestComputer
      
    }

    

    insert1Obj["out-identifier"] = "computerrequest";
    insert1Obj["return-object"] = false;
    insertCommand1.insert = insert1Obj;

    insertCommand2 = {
      "set-focus" : ruleFlowGroup
    };

    insertCommand3 = {
      ["fire-all-rules"]: {}
    };

    insertCommand4 = {
      ["get-objects"]: {
        ["out-identifier"]: "objects"
      }
    };

    commandList.push(insertCommand1);
    commandList.push(insertCommand2);
    commandList.push(insertCommand3);
    commandList.push(insertCommand4);

    postObject.commands = commandList;

    let url = this.kieSettings.baseurl + "/services/rest/server/containers/instances/" + this.kieSettings.dmcontainerAlias;
    const headers = {
      'Authorization': 'Basic ' + btoa(this.kieSettings.username + ":" + this.kieSettings.password),
      'content-type': 'application/json'
    };

    request = {
      request : postObject
    }

    return this.http.post(url, postObject, { headers });


  }


  onboardEmployee(employee : EmployeeWrapper)
  {
    let postData : ProcessInstanceData = {
      employeeRequest : employee
    };

    let url = this.kieSettings.baseurl + "/services/rest/server/containers/" + this.kieSettings.picontainerAlias + "/processes/" + this.kieSettings.processId + "/instances";
    const headers = {
      'Authorization': 'Basic ' + btoa(this.kieSettings.username + ":" + this.kieSettings.password),
      'content-type': 'application/json',
      'X-KIE-ContentType': 'JSON',
      'accept': 'application/json'
    };

   
      return this.http.post(url, postData, { headers });
  }
  
  getProcessInstances(type: string) {
    let status: number;
    if (type == "Active")
      status = 1;
    else
      status = 2;
    let url = this.kieSettings.baseurl + "/services/rest/server/containers/" + this.kieSettings.picontainerAlias + "/processes/instances?status=" + status + "&page=0&pageSize=100&sortOrder=true";
    const headers = {
      'Authorization': 'Basic ' + btoa(this.kieSettings.username + ":" + this.kieSettings.password),
      'content-type': 'application/json',
      'X-KIE-ContentType': 'JSON',
      'accept': 'application/json'
    };
    return this.http.get(url, { headers });

  }

  getProcessInstanceVariables(processInstanceId: number) {
    let url = this.kieSettings.baseurl + "/services/rest/server/containers/" + this.kieSettings.picontainerAlias + "/processes/instances/" + processInstanceId + "/variables";
    const headers = {
      'Authorization': 'Basic ' + btoa(this.kieSettings.username + ":" + this.kieSettings.password),
      'content-type': 'application/json',
      'X-KIE-ContentType': 'JSON',
      'accept': 'application/json'
    };
    return this.http.get(url, { headers });

  }

  getSVGImage(processInstanceId: number) {
    let url = this.kieSettings.baseurl + "/services/rest/server/containers/" + this.kieSettings.picontainerAlias + "/images/processes/instances/" + processInstanceId +
      "?svgCompletedColor=%23d8fdc1&svgCompletedBorderColor=%23030303&svgActiveBorderColor=%23FF0000";
    const headers = {
      'Authorization': 'Basic ' + btoa(this.kieSettings.username + ":" + this.kieSettings.password),
      'accept': 'application/svg+xml',
      'content-type': 'application/svg+xml'
    };
    return this.http.get(url, { headers, responseType: 'text' });
  }


  getActiveTaskInstances(processInstanceId: number) {
    let url = this.kieSettings.baseurl + "/services/rest/server/queries/tasks/instances/process/" + processInstanceId;
    const headers = {
      'Authorization': 'Basic ' + btoa(this.kieSettings.username + ":" + this.kieSettings.password),
      'content-type': 'application/json',
      'X-KIE-ContentType': 'JSON',
      'accept': 'application/json'
    };
    return this.http.get(url, { headers });
  }

  getTaskVariables(taskInstanceId: number) {
    let url = this.kieSettings.baseurl + "/services/rest/server/containers/" + this.kieSettings.picontainerAlias + "/tasks/" + taskInstanceId + "?withInputData=true&withOutputData=true&withAssignments=true";
    const headers = {
      'Authorization': 'Basic ' + btoa(this.kieSettings.username + ":" + this.kieSettings.password),
      'content-type': 'application/json',
      'X-KIE-ContentType': 'JSON',
      'accept': 'application/json'
    };
    return this.http.get(url, { headers });
  }


  updateTaskStatus(taskInstanceId: number, taskStatus: string,cred : Credentials) {
    let url = this.kieSettings.baseurl + "/services/rest/server/containers/" + this.kieSettings.picontainerAlias + "/tasks/" + taskInstanceId + "/states/" + taskStatus + "?user=" + cred.userid;
    const headers = {
      'Authorization': 'Basic ' + btoa(cred.userid + ":" + cred.password),
      'content-type': 'application/json',
      'X-KIE-ContentType': 'JSON',
      'accept': 'application/json'
    };
    return this.http.put(url, "", { headers });
  }

  updateVariables(taskInstanceId: number, data: any,cred : Credentials) {
    let url = this.kieSettings.baseurl + "/services/rest/server/containers/" + this.kieSettings.picontainerAlias + "/tasks/" + taskInstanceId + "/contents/output";
    const headers = {
      'Authorization': 'Basic ' + btoa(cred.userid + ":" + cred.password),
      'content-type': 'application/json',
      'X-KIE-ContentType': 'JSON',
      'accept': 'application/json'
    };
    return this.http.put(url, data, { headers });
  }

}