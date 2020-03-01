import { TestBed } from '@angular/core/testing';

import { LoggeduserguardGuard } from './loggeduserguard.guard';

describe('LoggeduserguardGuard', () => {
  let guard: LoggeduserguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggeduserguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
