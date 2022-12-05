import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionTaskComponent } from './provision-task.component';

describe('ProvisionTaskComponent', () => {
  let component: ProvisionTaskComponent;
  let fixture: ComponentFixture<ProvisionTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
