import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../Model/UserRole';
import { faUser,faCog,faDatabase } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { KieSettingsComponent } from '../../Modals/KieSettings/KieSettings.component';
import { CompletedProcessInstanceComponent } from '../../Modals/completed-process-instance/completed-process-instance.component';

@Component({
  selector: 'app-maincomponent',
  templateUrl: './maincomponent.component.html',
  styleUrls: ['./maincomponent.component.css']
})
export class MaincomponentComponent implements OnInit {

  user : UserRole;
  userList : UserRole[];
  selectedOption : string;
  faUser = faUser;
  faCogs = faCog;
  faDatabase = faDatabase;

  

  constructor(private modalService: NgbModal) { 
    this.userList = [
      {
        id : 1,
        name : "Andrew Smith",
        role : "Manager",
        userid : "AndrewSmith",
        password : "test123"
      },
      {
        id : 2,
        name : "John Stark",
        role : "HR Manager",
        userid : "JohnStark",
        password : "test123"
      },
      {
        id : 3,
        name : "Stacie Dorsey",
        role : "Provisioning Team",
        userid : "StacieDorsey",
        password : "test123"
      },
      {
        id : 4,
        name : "Robert",
        role : "External Vendor",
        userid : "Robert",
        password : "test123"
      },
      {
        id : 5,
        name : "Michael Scott",
        role : "Escalation Manager",
        userid : "MichaelScott",
        password : "test123"
      },
    ];

    this.user = this.userList[0];

  }

  changeSelectedOption(option : UserRole)
  {
      this.user = option;
      this.selectedOption = option.name;
  }


  ngOnInit(): void {
  }

  openSettings()
  {
    const modalRef = this.modalService.open(KieSettingsComponent, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' });
    
    modalRef.result.then((result) => {
     
      
    }, (reason) => {
      
    });
  }

  openClosedCases()
  {
    const modalRef = this.modalService.open(CompletedProcessInstanceComponent, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' });
    
    modalRef.result.then((result) => {
     
      
    }, (reason) => {
      
    });
  }

}
