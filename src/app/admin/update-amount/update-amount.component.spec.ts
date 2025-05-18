import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAmountComponent } from './update-amount.component';

describe('UpdateAmountComponent', () => {
  let component: UpdateAmountComponent;
  let fixture: ComponentFixture<UpdateAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
