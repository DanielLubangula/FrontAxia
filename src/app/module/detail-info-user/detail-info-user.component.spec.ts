import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoUserComponent } from './detail-info-user.component';

describe('DetailInfoUserComponent', () => {
  let component: DetailInfoUserComponent;
  let fixture: ComponentFixture<DetailInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailInfoUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
