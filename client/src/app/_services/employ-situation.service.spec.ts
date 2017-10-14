import { TestBed, inject } from '@angular/core/testing';

import { EmploySituationService } from './employ-situation.service';

describe('EmploySituationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmploySituationService]
    });
  });

  it('should be created', inject([EmploySituationService], (service: EmploySituationService) => {
    expect(service).toBeTruthy();
  }));
});
