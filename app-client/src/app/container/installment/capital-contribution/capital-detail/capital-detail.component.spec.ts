import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalDetailComponent } from './capital-detail.component';

describe('CapitalDetailComponent', () => {
  let component: CapitalDetailComponent;
  let fixture: ComponentFixture<CapitalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
