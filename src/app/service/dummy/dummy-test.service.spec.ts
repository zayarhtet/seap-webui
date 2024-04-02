import { TestBed } from '@angular/core/testing';

import { DummyTestService } from './dummy-test.service';

describe('DummyTestService', () => {
  let service: DummyTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
