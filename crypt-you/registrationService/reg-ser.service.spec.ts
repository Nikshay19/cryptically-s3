import { TestBed } from '@angular/core/testing';

import { RegSerService } from './reg-ser.service';

describe('RegSerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegSerService = TestBed.get(RegSerService);
    expect(service).toBeTruthy();
  });
});
