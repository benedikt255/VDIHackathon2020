import {TestBed} from '@angular/core/testing';
import {LinkandoService} from './linkando.service';

describe('LinkandoService', () => {
  let service: LinkandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkandoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
