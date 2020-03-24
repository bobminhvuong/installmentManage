import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestReportComponent } from './interest-report.component';

describe('InterestReportComponent', () => {
  let component: InterestReportComponent;
  let fixture: ComponentFixture<InterestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
