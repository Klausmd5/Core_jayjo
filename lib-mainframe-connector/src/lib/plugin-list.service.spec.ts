import { TestBed } from '@angular/core/testing';

import { PluginListService } from './plugin-list.service';

describe('PluginListService', () => {
  let service: PluginListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
