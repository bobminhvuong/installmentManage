import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBdsComponent } from './sell-bds.component';

describe('SellBdsComponent', () => {
  let component: SellBdsComponent;
  let fixture: ComponentFixture<SellBdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
