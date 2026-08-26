import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LayersService } from './layers.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('LayersService', () => {
  let service: LayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MatDialogModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(LayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
