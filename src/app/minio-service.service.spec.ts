import { TestBed } from '@angular/core/testing';

import { MinioServiceService } from './minio-service.service';

describe('MinioServiceService', () => {
  let service: MinioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
