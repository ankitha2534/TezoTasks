import { TestBed } from '@angular/core/testing';

import { EmployeeManagementAPIServiceService } from './employee-management-apiservice.service';

describe('EmployeeManagementAPIServiceService', () => {
  let service: EmployeeManagementAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeManagementAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
