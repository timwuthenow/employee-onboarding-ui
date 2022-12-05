import { Component, OnInit,ElementRef, ViewChild  } from '@angular/core';
import { PAMServices } from 'src/app/service/PAMServices';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessInstanceList } from '../../Model/Requests/Request';

@Component({
  selector: 'app-completed-process-instance',
  templateUrl: './completed-process-instance.component.html',
  styleUrls: ['./completed-process-instance.component.css']
})
export class CompletedProcessInstanceComponent implements OnInit {

  @ViewChild("svgContent") svgContentElement: ElementRef;
  svgContent : string;
  allowSvgContent : boolean = false;

  service : PAMServices;
  closedProcessInstances: ProcessInstanceList[] = new Array();

  constructor(pamService : PAMServices,public activeModal: NgbActiveModal) { 
    this.service = pamService;
   
  }

  ngOnInit(): void {
    this.service.getProcessInstances("Completed").subscribe((res: any) => {
      this.buildCaseList(res, this.closedProcessInstances, "Completed");
    }, err => { console.log(err) });
  }

  private buildCaseList(response: any, caseList: ProcessInstanceList[], type: string) {
    let currentStatus = "Active";
    if (type != "Active")
      currentStatus = "Completed";

    if (response["process-instance"] && response["process-instance"] instanceof Array) {
      response["process-instance"].forEach((instance: any) => {
        let processInstance: ProcessInstanceList = {
          processInstanceId: instance["process-instance-id"],
          status: currentStatus,
          startedDate: instance["start-date"]["java.util.Date"]
        }
        caseList.push(processInstance);
      });
      caseList = caseList.sort((a: ProcessInstanceList, b: ProcessInstanceList) => {
        if (a.processInstanceId >= b.processInstanceId)
          return -1;
        else
          return 1;
      });

    }
  }


  onShowFlow(processInstanceId : number,type : string)
  {
      if(this.allowSvgContent)
        {
          this.allowSvgContent = false;
          return;
        }
      this.service.getSVGImage(processInstanceId).subscribe((res : any) => { 
        this.svgContent = res;
            this.svgContentElement.nativeElement.innerHTML = this.svgContent;
      },err=>{ console.error(err);});
      this.allowSvgContent = true;
  }

  dismiss()
  {
    this.activeModal.dismiss();
  }

}
