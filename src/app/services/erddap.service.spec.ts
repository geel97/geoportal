import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ErddapService } from './erddap.service';

describe('ErddapService', () => {
  let service: ErddapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ErddapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
