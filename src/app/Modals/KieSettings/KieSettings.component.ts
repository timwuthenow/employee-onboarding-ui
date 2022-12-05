import { Component, OnInit } from '@angular/core';
import { KieSettings } from 'src/app/Model/KieSettings/KieSettings';
import { PAMServices } from 'src/app/service/PAMServices';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-KieSettings',
  templateUrl: './KieSettings.component.html',
  styleUrls: ['./KieSettings.component.css']
})
export class KieSettingsComponent implements OnInit {

  baseurl : string;
  pamService : PAMServices;
  kieSettings : KieSettings;
 

  constructor(pamService : PAMServices,public activeModal: NgbActiveModal) { 
    this.pamService = pamService;
    this.kieSettings = pamService.getCurrentKieSettings();
   
  }

  updateKieSettings()
  {
      this.pamService.updateKieSettings(this.kieSettings);
      window.alert("Settings Saved Successfully");
  }

  ngOnInit() {
    this.kieSettings = this.pamService.getCurrentKieSettings();
    console.log(this.kieSettings);
    this.baseurl = this.kieSettings.baseurl;
  }

  dismiss()
  {
    this.activeModal.dismiss();
  }

}
