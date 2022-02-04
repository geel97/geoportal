import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErddapService } from './erddap.service';

describe('ErddapService', () => {
  let service: ErddapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ErddapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
