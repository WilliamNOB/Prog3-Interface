import { TestBed } from '@angular/core/testing';

import { VehiclesDriverService } from './vehicles-driver.service';

describe('VehiclesDriverService', () => {
  let service: VehiclesDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
