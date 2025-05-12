import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuelDepositComponent } from './manuel-deposit.component';

describe('ManuelDepositComponent', () => {
  let component: ManuelDepositComponent;
  let fixture: ComponentFixture<ManuelDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManuelDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManuelDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
