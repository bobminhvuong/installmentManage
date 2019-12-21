import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdsComponent } from './bds.component';

describe('BdsComponent', () => {
  let component: BdsComponent;
  let fixture: ComponentFixture<BdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
