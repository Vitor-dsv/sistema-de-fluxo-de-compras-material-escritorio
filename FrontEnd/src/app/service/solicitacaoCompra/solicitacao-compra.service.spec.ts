import { TestBed } from '@angular/core/testing';

import { SolicitacaoCompraService } from './solicitacao-compra.service';

describe('SolicitacaoCompraService', () => {
  let service: SolicitacaoCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
