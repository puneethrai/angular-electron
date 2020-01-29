import { TestBed } from '@angular/core/testing';

import { Jira.ServiceService } from './jira.service.service';

describe('Jira.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Jira.ServiceService = TestBed.get(Jira.ServiceService);
    expect(service).toBeTruthy();
  });
});
