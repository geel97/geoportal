import { TestBed } from '@angular/core/testing';

import { ErddapService } from './erddap.service';

describe('ErddapService', () => {
  let service: ErddapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErddapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
