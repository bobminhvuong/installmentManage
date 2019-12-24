import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPaymentHistoryComponent } from './interest-payment-history.component';

describe('InterestPaymentHistoryComponent', () => {
  let component: InterestPaymentHistoryComponent;
  let fixture: ComponentFixture<InterestPaymentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestPaymentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
