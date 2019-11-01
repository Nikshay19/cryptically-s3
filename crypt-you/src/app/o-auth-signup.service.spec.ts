import { TestBed } from '@angular/core/testing';

import { OAuthSignupService } from './o-auth-signup.service';

describe('OAuthSignupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OAuthSignupService = TestBed.get(OAuthSignupService);
    expect(service).toBeTruthy();
  });
});
