import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRTaskComponent } from './hrtask.component';

describe('HRTaskComponent', () => {
  let component: HRTaskComponent;
  let fixture: ComponentFixture<HRTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
