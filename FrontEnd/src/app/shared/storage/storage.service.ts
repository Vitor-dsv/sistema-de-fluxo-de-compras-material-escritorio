import { Injectable } from '@angular/core';
import { TipoUsuario } from 'src/app/domain/TipoUsuario';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    getToken(): string {
        return window.localStorage.getItem("TOKEN");
    }

    setToken(token: string) {
        window.localStorage.setItem("TOKEN", token);
    }

    getUserType(): TipoUsuario {
        return TipoUsuario[window.localStorage.getItem("USER_TYPE")];
    }

    setUserType(userType: string) {
        window.localStorage.setItem("USER_TYPE", userType);
    }

}