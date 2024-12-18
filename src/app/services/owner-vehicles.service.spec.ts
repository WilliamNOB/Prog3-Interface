import { TestBed } from '@angular/core/testing';

import { OwnerVehiclesService } from './owner-vehicles.service';

describe('OwnerVehiclesService', () => {
  let service: OwnerVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
