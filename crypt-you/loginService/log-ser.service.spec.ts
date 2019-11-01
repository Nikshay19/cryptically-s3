import { TestBed } from '@angular/core/testing';

import { LogSerService } from './log-ser.service';

describe('LogSerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogSerService = TestBed.get(LogSerService);
    expect(service).toBeTruthy();
  });
});
