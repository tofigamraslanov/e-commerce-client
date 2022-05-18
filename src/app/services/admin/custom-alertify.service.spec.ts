import { TestBed } from '@angular/core/testing';
import { CustomAlertifyService } from './custom-alertify.service';

describe('CustomAlertifyService', () => {
  let service: CustomAlertifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAlertifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
