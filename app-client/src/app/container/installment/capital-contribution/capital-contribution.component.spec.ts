import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalContributionComponent } from './capital-contribution.component';

describe('CapitalContributionComponent', () => {
  let component: CapitalContributionComponent;
  let fixture: ComponentFixture<CapitalContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
