import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouUserComponent } from './cou-user.component';

describe('CouUserComponent', () => {
  let component: CouUserComponent;
  let fixture: ComponentFixture<CouUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
