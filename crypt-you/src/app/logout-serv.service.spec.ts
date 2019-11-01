import { TestBed } from '@angular/core/testing';

import { LogoutServService } from './logout-serv.service';

describe('LogoutServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogoutServService = TestBed.get(LogoutServService);
    expect(service).toBeTruthy();
  });
});
