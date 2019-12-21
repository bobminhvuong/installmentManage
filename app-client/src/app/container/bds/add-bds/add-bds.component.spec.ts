import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBdsComponent } from './add-bds.component';

describe('AddBdsComponent', () => {
  let component: AddBdsComponent;
  let fixture: ComponentFixture<AddBdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
