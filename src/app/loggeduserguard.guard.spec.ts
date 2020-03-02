import { TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { LoggeduserguardGuard } from './loggeduserguard.guard';

describe('LoggeduserguardGuard', () => {
  let guard: LoggeduserguardGuard;
  let router = {
    navigate: jasmine.createSpy(''),    // to spy on the url that has been routed
};
beforeEach((() => {
  TestBed.configureTestingModule({
    
    providers: [
      {provide: Router, useValue: router},
  
    ]
  }).compileComponents();
}));
  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggeduserguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
