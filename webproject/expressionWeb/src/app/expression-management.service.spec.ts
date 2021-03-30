import { TestBed } from '@angular/core/testing';

import { ExpressionManagementService } from './expression-management.service';

describe('ExpressionManagementService', () => {
  let service: ExpressionManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
