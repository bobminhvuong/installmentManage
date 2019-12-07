import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItmListComponent } from './itm-list.component';

describe('ItmListComponent', () => {
  let component: ItmListComponent;
  let fixture: ComponentFixture<ItmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
