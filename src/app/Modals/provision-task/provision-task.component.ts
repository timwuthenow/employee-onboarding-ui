import { Component, OnInit,Input } from '@angular/core';
import { PAMServices } from 'src/app/service/PAMServices';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimesCircle, faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { Employee, Contact, ComputerRequest } from 'src/app/Model/Requests/Request';
import { Credentials, UserRole } from 'src/app/Model/UserRole';

@Component({
  selector: 'app-provision-task',
  templateUrl: './provision-task.component.html',
  styleUrls: ['./provision-task.component.css']
})
export class ProvisionTaskComponent implements OnInit {

  @Input() response : any;
  @Input() currentUser : UserRole;

  taskid : number;
  faTimesCircle = faTimesCircle;
  employee : Employee = {};
  contact : Contact = {};
  requestedMachine : ComputerRequest = {};
  assignedMachine : ComputerRequest = {};
  status : boolean = false;
  service : PAMServices;
  readonly : boolean = false;
  cred : Credentials;

  constructor(pamService : PAMServices,public activeModal: NgbActiveModal) { 
    this.service = pamService;
  }



  ngOnInit(): void {
    this.translateData();
    this.cred = {
      userid : this.currentUser.userid,
      password : this.currentUser.password
    }
  }

  dismiss()
  {
    this.activeModal.dismiss();
  }

  private translateData()
  {
      this.taskid = this.response["task-id"];
      if(this.response && this.response["task-input-data"] && this.response["task-input-data"].employee && this.response["task-input-data"].employee["com.deluxedemo.deluxemodels.Employee"])
      {
         this.employee = this.response["task-input-data"].employee["com.deluxedemo.deluxemodels.Employee"];
         this.employee.dateofHire = this.employee.dateofHire;
         this.contact = this.employee.contact["com.deluxedemo.deluxemodels.Contact"];
         this.requestedMachine = this.employee.requestedMachine["com.deluxedemo.deluxemodels.ComputerRequest"];
         this.assignedMachine = this.employee.assignedMachine["com.deluxedemo.deluxemodels.ComputerRequest"];
      }
  }

  onClaimStart() {
    //  this.readonly = false;
      try {
        this.service.updateTaskStatus(this.taskid, "started",this.cred).subscribe(res => {
          
        }, err => { this.readonly = false })
      } catch (e) {
        this.readonly = true;
        console.error(e);
      }
      
    }

  updateStatus()
  {
     this.service.updateVariables(this.taskid,{"comments" : this.employee.comments},this.cred).subscribe((res:any)=>{console.log(res)});
  }  

  onComplete()
  {
    this.service.updateVariables(this.taskid,{"comments" : this.employee.comments},this.cred).subscribe((res:any)=>{
      this.service.updateTaskStatus(this.taskid, "completed",this.cred).subscribe(res => {
      this.dismiss();
    }, err => { this.readonly = false });});
    
  
  }

}
