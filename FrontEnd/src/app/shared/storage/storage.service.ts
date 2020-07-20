import { Injectable } from '@angular/core';
import { TipoUsuario } from 'src/app/domain/TipoUsuario';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    getTipoUsuario(): TipoUsuario {
        return TipoUsuario[window.localStorage.getItem("TIPO_USUARIO")];
    }

    setTipoUsuario(userType: string) {
        window.localStorage.setItem("TIPO_USUARIO", userType);
    }

    getIdUsuario(): string {
        return window.localStorage.getItem("ID_USUARIO");
    }

    setIdUsuario(id: string): void {
        window.localStorage.setItem("ID_USUARIO", id);
    }
}