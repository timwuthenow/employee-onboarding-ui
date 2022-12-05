import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResponseModalComponent } from './request-response-modal.component';

describe('RequestResponseModalComponent', () => {
  let component: RequestResponseModalComponent;
  let fixture: ComponentFixture<RequestResponseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResponseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResponseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
