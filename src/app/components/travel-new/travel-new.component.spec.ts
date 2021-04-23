import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelNewComponent } from './travel-new.component';

describe('TravelNewComponent', () => {
  let component: TravelNewComponent;
  let fixture: ComponentFixture<TravelNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
