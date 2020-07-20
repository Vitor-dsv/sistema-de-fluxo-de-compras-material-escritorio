import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { StorageService } from '../shared/storage/storage.service';
import { TipoUsuario } from '../domain/TipoUsuario';
import { Router } from '@angular/router';
import { Usuario } from '../domain/Usuario';
import { UsuarioService } from '../service/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() login: LoginComponent;

  loginForm: FormGroup;

  submitForm(): void {
  }

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private storageService: StorageService,
    private router: Router,
    private usuarioService: UsuarioService) {

    this.loginForm = this.fb.group({
      usuario: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  efetuarLogin(): void {
    let login = this.loginForm.get('usuario').value;
    let senha = this.loginForm.get('senha').value;

    this.usuarioService.retornarUsuarioLogin(login, senha).subscribe(user => {
      if (user) {
        this.storageService.setIdUsuario(user.id.toString());
        this.storageService.setTipoUsuario(user.tipo);
        this.router.navigate(['/fluxo-de-compras']);
      } else {
        this.message.create('error', 'Usuário ou senha incorretos.');
      }
    });
  }
}


