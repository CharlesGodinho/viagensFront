import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersNewComponent } from './passengers-new.component';

describe('PassengersNewComponent', () => {
  let component: PassengersNewComponent;
  let fixture: ComponentFixture<PassengersNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
