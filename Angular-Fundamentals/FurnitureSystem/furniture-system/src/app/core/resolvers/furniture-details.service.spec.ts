import { TestBed } from '@angular/core/testing';

import { FurnitureDetailsService } from '../../furniture-details.service';

describe('FurnitureDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FurnitureDetailsService = TestBed.get(FurnitureDetailsService);
    expect(service).toBeTruthy();
  });
});
