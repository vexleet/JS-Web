import { TestBed } from '@angular/core/testing';

import { FurnitureEditService } from './furniture-edit.service';

describe('FurnitureEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FurnitureEditService = TestBed.get(FurnitureEditService);
    expect(service).toBeTruthy();
  });
});
