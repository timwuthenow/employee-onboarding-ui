import { Component, OnInit } from '@angular/core';
//import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PAMServices } from 'src/app/service/PAMServices';
import { KieSettings } from 'src/app/Model/KieSettings/KieSettings';
import { MachineRequest } from 'src/app/Model/Entity/Entity';
import { ComputerRequest, ServiceRequest, ServiceResponse, ComputerRequestWrapper, EmployeeWrapper, Employee, Contact, ContactWrapper } from 'src/app/Model/Requests/Request';
import { faTerminal,faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  employee : Employee = {};
  employeeWrapper : EmployeeWrapper;
  contact : Contact = {};

  dateofHire : Date;
  computerRequest : ComputerRequest;
  pamService : PAMServices;
  name : string;
  kieSettings : KieSettings;
  machinePrice : number;
  request : ServiceRequest;
  response : ServiceResponse;
  faTerminal =  faTerminal;
  faTimesCircle = faTimesCircle;

  constructor(public activeModal: NgbActiveModal,pamService:PAMServices)
  { 
    this.pamService = pamService
    this.kieSettings = pamService.getCurrentKieSettings();

  }

  ngOnInit(): void {
    this.computerRequest = {
     
    }
  }


  dismiss()
  {
    this.activeModal.dismiss();
  }

  getPrice()
  {
      let computerequestWrapper : ComputerRequestWrapper = {
        "com.deluxedemo.deluxemodels.ComputerRequest" : this.computerRequest
      }

     this.pamService.getPrice(computerequestWrapper,this.request,"calculatePrice").subscribe((res:any) => {
        this.translateRuleEngineRepsonse(res);
        console.log(this.request);
     },err => { console.log(err)});
  }


  private translateRuleEngineRepsonse(ruleEngineResponse : any )
  {
     
     if(ruleEngineResponse.result && ruleEngineResponse.result["execution-results"] && 
         ruleEngineResponse.result["execution-results"].results instanceof Array && 
         ruleEngineResponse.result["execution-results"].results.length > 0 && 
         ruleEngineResponse.result["execution-results"].results[0].value instanceof Array &&
         ruleEngineResponse.result["execution-results"].results[0].value.length >= 1) 
     {
         let ruleEngineEntity = ruleEngineResponse.result["execution-results"].results[0].value[0];
         if(ruleEngineEntity["com.deluxedemo.deluxemodels.ComputerRequest"])
         {
            let entityObjResponse = ruleEngineEntity["com.deluxedemo.deluxemodels.ComputerRequest"];
            this.machinePrice = entityObjResponse.price;
            this.computerRequest.price = entityObjResponse.price;
         }
     } 

  }

  onboardEmployee()
  {
      let computerWrapper : ComputerRequestWrapper =
      {
        "com.deluxedemo.deluxemodels.ComputerRequest" : this.computerRequest
      }

      let contactWrapper : ContactWrapper = {
        "com.deluxedemo.deluxemodels.Contact" : this.contact
      }
      
      this.employee.contact = contactWrapper;
      this.employee.requestedMachine = computerWrapper;
      this.employee.dateofHire = {
        "java.util.Date" : new Date(this.dateofHire).getTime()
      };
      
      this.employeeWrapper = {
        "com.deluxedemo.deluxemodels.Employee" : this.employee
      }

      this.pamService.onboardEmployee(this.employeeWrapper).subscribe((res:any)=>{
         window.alert(" New Process Instance Created : " + res);
         this.dismiss();
      },error=>{console.log(error)});
  }


}
