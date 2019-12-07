import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCtrComponent } from './image-ctr.component';

describe('ImageCtrComponent', () => {
  let component: ImageCtrComponent;
  let fixture: ComponentFixture<ImageCtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
