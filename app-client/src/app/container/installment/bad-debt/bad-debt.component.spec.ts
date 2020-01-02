import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadDebtComponent } from './bad-debt.component';

describe('BadDebtComponent', () => {
  let component: BadDebtComponent;
  let fixture: ComponentFixture<BadDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
