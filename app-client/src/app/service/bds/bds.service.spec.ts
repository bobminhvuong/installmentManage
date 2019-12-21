import { TestBed } from '@angular/core/testing';

import { BdsService } from './bds.service';

describe('BdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BdsService = TestBed.get(BdsService);
    expect(service).toBeTruthy();
  });
});
