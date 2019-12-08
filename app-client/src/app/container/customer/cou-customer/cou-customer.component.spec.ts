import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouCustomerComponent } from './cou-customer.component';

describe('CouCustomerComponent', () => {
  let component: CouCustomerComponent;
  let fixture: ComponentFixture<CouCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
