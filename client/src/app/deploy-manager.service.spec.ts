import { TestBed, inject } from '@angular/core/testing';

import { DeployManagerService } from './deploy-manager.service';

describe('DeployManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeployManagerService]
    });
  });

  it('should be created', inject([DeployManagerService], (service: DeployManagerService) => {
    expect(service).toBeTruthy();
  }));
});
