import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SolicitacaoCompra } from 'src/app/domain/SolicitacaoCompra';

import { StatusCompra } from 'src/app/domain/StatusCompra';
import { SolicitacaoDTO } from 'src/app/domain/SolicitacaoDTO';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoCompraService {

  constructor(private http: HttpClient) { }
  private static API = `${environment.api}/solicitacao-compra`;

  retornarSolicitacoesUsuarioEspecifico(idUsuario: number): Observable<SolicitacaoDTO[]> {
    let parametros = new HttpParams();
    parametros = parametros.set('usuarioId', idUsuario.toString());
    return this.http.get<SolicitacaoDTO[]>(`${SolicitacaoCompraService.API}/por-usuario`, {
      params: parametros
    });
  }

  retornarSolicitacoesFiltro(status?: StatusCompra, nome?: string, descricao?: string): Observable<SolicitacaoDTO[]> {
    let parametros = new HttpParams();

    parametros = status ? parametros.set('statusCompra', status.toUpperCase()) : parametros;
    parametros = nome ? parametros.set('nome', nome) : parametros;
    parametros = descricao ? parametros.set('descricao', descricao) : parametros;

    return this.http.get<SolicitacaoDTO[]>(`${SolicitacaoCompraService.API}/filtros`, {
      params: parametros
    });
  }

  retornarTodasSolicitacoes(): Observable<SolicitacaoDTO[]> {
    return this.http.get<SolicitacaoDTO[]>(SolicitacaoCompraService.API);
  }

  addSolicitacao(solicitacao: SolicitacaoCompra): Observable<SolicitacaoCompra> {
    return this.http.post<SolicitacaoCompra>(SolicitacaoCompraService.API, solicitacao);
  }

  atualizarSolicitacao(solicitacao: SolicitacaoCompra): Observable<SolicitacaoCompra> {
    return this.http.put<SolicitacaoCompra>(`${SolicitacaoCompraService.API}/${solicitacao.id}`, solicitacao);
  }
}