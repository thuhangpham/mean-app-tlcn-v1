import { TestBed, inject } from '@angular/core/testing';

import { AreaExperService } from './area-exper.service';

describe('AreaExperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaExperService]
    });
  });

  it('should be created', inject([AreaExperService], (service: AreaExperService) => {
    expect(service).toBeTruthy();
  }));
});
