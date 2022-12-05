import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaincomponentComponent } from './component/maincomponent/maincomponent.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManagerComponent } from './component/manager/manager.component';
import { HrComponent } from './component/hr/hr.component';
import { ProvisioningComponent } from './component/provisioning/provisioning.component';
import { NewEmployeeComponent } from './Modals/new-employee/new-employee.component';
import { KieSettingsComponent } from './Modals/KieSettings/KieSettings.component'
import { CookieModule } from 'ngx-cookie';
import { JsonPipe } from '@angular/common';
import { RequestResponseModalComponent } from './Modals/request-response-modal/request-response-modal.component';
import { ManagerTaskComponent } from './Modals/manager-task/manager-task.component';
import { HRTaskComponent } from './Modals/hrtask/hrtask.component';
import { ProvisionTaskComponent } from './Modals/provision-task/provision-task.component';
import { ContractorTaskComponent } from './Modals/contractor-task/contractor-task.component';
import { CompletedProcessInstanceComponent } from './Modals/completed-process-instance/completed-process-instance.component';
import { ContractorComponent } from './component/contractor/contractor.component';

@NgModule({
  declarations: [
    AppComponent,
    MaincomponentComponent,
    ManagerComponent,
    HrComponent,
    ProvisioningComponent,
    NewEmployeeComponent,
    KieSettingsComponent,
    RequestResponseModalComponent,
    ManagerTaskComponent,
    HRTaskComponent,
    ProvisionTaskComponent,
    ContractorTaskComponent,
    CompletedProcessInstanceComponent,
    ContractorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CookieModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
