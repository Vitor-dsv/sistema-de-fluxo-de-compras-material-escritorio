import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../shared/storage/storage.service';
import { TipoUsuario } from '../domain/TipoUsuario';
import { Usuario } from '../domain/Usuario';
import { Solicitacao } from '../domain/Solicitacao';



@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css']
})

export class RequesterComponent implements OnInit {
  @Input() requester: RequesterComponent;

  tipoUsuarioCorrente: TipoUsuario;
  listaSolicitante: Solicitacao[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.tipoUsuarioCorrente = this.storageService.getUserType();

    this.addItensListaSolicitante();
  }

  addItensListaSolicitante() {
    this.listaSolicitante = [
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
      {
        id: 1,
        nomeSolicitante: 'Cleber',
        descricaoItem: 'Muito bom',
        preco: '20,50',
      },
    ];
  }

}
