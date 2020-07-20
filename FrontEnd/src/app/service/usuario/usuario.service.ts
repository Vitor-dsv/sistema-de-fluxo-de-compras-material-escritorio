import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/domain/Usuario';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  private static API = `${environment.api}/usuario`;

  retornarUsuarioLogin(login: string, senha: string): Observable<Usuario> {
    let parametros = new HttpParams();

    parametros = parametros.set('login', login);
    parametros = parametros.set('senha', senha);

    return this.http.get<Usuario>(`${UsuarioService.API}/login`, {
      params: parametros
    })
  }

}
