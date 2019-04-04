import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFormDetailsComponent } from './sales-form-details.component';

describe('SalesFormDetailsComponent', () => {
  let component: SalesFormDetailsComponent;
  let fixture: ComponentFixture<SalesFormDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesFormDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
