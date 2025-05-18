import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRetraitComponent } from './request-retrait.component';

describe('RequestRetraitComponent', () => {
  let component: RequestRetraitComponent;
  let fixture: ComponentFixture<RequestRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestRetraitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
