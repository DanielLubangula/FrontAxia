import { TestBed } from '@angular/core/testing';

import { ManuelDepositService } from './manuel-deposit.service';

describe('ManuelDepositService', () => {
  let service: ManuelDepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManuelDepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
