import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorTaskComponent } from './contractor-task.component';

describe('ContractorTaskComponent', () => {
  let component: ContractorTaskComponent;
  let fixture: ComponentFixture<ContractorTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
