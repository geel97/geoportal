import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LayersService } from './layers.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('LayersService', () => {
  let service: LayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
    });
    service = TestBed.inject(LayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
