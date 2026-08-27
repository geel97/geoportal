import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { ErddapService } from './erddap.service';

describe('ErddapService', () => {
  let service: ErddapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())],
    });
    service = TestBed.inject(ErddapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
