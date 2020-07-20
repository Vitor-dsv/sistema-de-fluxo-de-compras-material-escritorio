import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';

import { TipoUsuario } from '../domain/TipoUsuario';
import { Usuario } from '../domain/Usuario';
import { SolicitacaoCompra } from '../domain/SolicitacaoCompra';
import { StatusCompra } from '../domain/StatusCompra';

import { SolicitacaoCompraService } from '../service/solicitacaoCompra/solicitacao-compra.service';
import { StorageService } from '../shared/storage/storage.service';
import { SolicitacaoDTO } from '../domain/SolicitacaoDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css']
})

export class RequesterComponent implements OnInit {
  @Input() requester: RequesterComponent;

  addSolicitacaoForm!: FormGroup;
  editReprovaSolicitacaoForm!: FormGroup;
  filtroSolicitacoesForm!: FormGroup;

  listaSolicitacoes: SolicitacaoDTO[] = [];
  tipoUsuarioCorrente: TipoUsuario;
  idUsuarioCorrente: number;

  tituloPagina: String;
  modalCompra = false;
  modalDescricaoReprovacao = false;
  modalReprovacao = false;
  carregamentoBotaoCadastro = false;

  formatoReal = (value: number) => value == undefined ? `` : `R$ ${value}`;
  analisarReal = (value: string) => value == undefined ? `` : value.replace('R$ ', '');

  constructor(
    private message: NzMessageService,
    private solicitacaoCompraService: SolicitacaoCompraService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {
    this.addSolicitacaoForm = this.fb.group({
      valorItem: [null, [Validators.required]],
      descricaoItem: [null, [Validators.required]]
    });

    this.editReprovaSolicitacaoForm = this.fb.group({
      descricaoReprovacao: [null, [Validators.required]]
    });

    this.filtroSolicitacoesForm = this.fb.group({
      statusFluxo: [null],
      nomeSolicitante: [null],
      descricao: [null]
    });
  }

  ngOnInit(): void {
    this.tipoUsuarioCorrente = this.storageService.getTipoUsuario();
    this.idUsuarioCorrente = parseInt(this.storageService.getIdUsuario(), 10);

    switch (this.tipoUsuarioCorrente) {
      case TipoUsuario.SOLICITANTE: {
        this.tituloPagina = 'Solicitante de compras'
        this.pegarSolicitacoesUsuarioEspecifico(this.idUsuarioCorrente);
        break;
      };

      case TipoUsuario.AlMOXARIFE: {
        this.tituloPagina = 'Almoxarife';
        this.pegarTodasSolicitacoes();
        break;
      };

      case TipoUsuario.ADMINISTRATIVO: {
        this.tituloPagina = 'Administrativo';
        this.pegarTodasSolicitacoes();
      };
    }
  }

  pegarSolicitacoesUsuarioEspecifico(id: number): void {
    this.solicitacaoCompraService.retornarSolicitacoesUsuarioEspecifico(id).subscribe(sol => {
      this.listaSolicitacoes = sol.sort((a, b) => {
        return a.id - b.id;
      })
    })
  }

  filtrarSolicitacoes(): void {
    let status = this.filtroSolicitacoesForm.get('statusFluxo').value ? this.filtroSolicitacoesForm.get('statusFluxo').value : '';
    let nome = this.filtroSolicitacoesForm.get('nomeSolicitante').value ? this.filtroSolicitacoesForm.get('nomeSolicitante').value : '';
    let descricao = this.filtroSolicitacoesForm.get('descricao').value ? this.filtroSolicitacoesForm.get('descricao').value : '';

    this.solicitacaoCompraService.retornarSolicitacoesFiltro(status, nome, descricao).subscribe(res => {
      this.listaSolicitacoes = res;
    })
  }

  pegarTodasSolicitacoes(): void {
    this.solicitacaoCompraService.retornarTodasSolicitacoes().subscribe(sol => {
      this.listaSolicitacoes = sol.sort((a, b) => {
        return a.id - b.id
      });
    })
  }

  cadastrarSolicitacao(): void {
    this.carregamentoBotaoCadastro = true;

    setTimeout(() => {
      let solicitacao: SolicitacaoCompra = this.retornarSolicitacaoCadastro(this.idUsuarioCorrente);

      this.solicitacaoCompraService.addSolicitacao(solicitacao).subscribe(res => {
        this.pegarSolicitacoesUsuarioEspecifico(this.idUsuarioCorrente);
        this.limparCamposDoGrupo(this.addSolicitacaoForm);
        this.mensagemSucesso('Cadastrado com sucesso!');
      });

      this.modalCompra = false;
      this.carregamentoBotaoCadastro = false;
    }, 1500);
  }

  atualizarStatusSolicitacao(status: String, solicitacao: SolicitacaoDTO) {
    this.carregamentoBotaoCadastro = true;

    setTimeout(() => {
      let solicitacaoAtualizada = new SolicitacaoCompra();
      solicitacaoAtualizada = this.retornarSolicitacaoStatusAtualizado(status, solicitacao);

      this.solicitacaoCompraService.atualizarSolicitacao(solicitacaoAtualizada).subscribe(res => {
        this.pegarTodasSolicitacoes();
        this.mensagemSucesso(`Registro ${status.toLowerCase()} com sucesso!`);
      });

      this.modalReprovacao = false;
      this.carregamentoBotaoCadastro = false;
    }, 1500);
  }

  retornarSolicitacaoCadastro(idUsuario: number): SolicitacaoCompra {
    let solicitacao: SolicitacaoCompra = new SolicitacaoCompra();

    solicitacao.preco = this.addSolicitacaoForm.get('valorItem') ? this.addSolicitacaoForm.get('valorItem').value : undefined;
    solicitacao.descricao = this.addSolicitacaoForm.get('descricaoItem') ? this.addSolicitacaoForm.get('descricaoItem').value : undefined;
    solicitacao.statusCompra = StatusCompra.AGUARDANDO;

    solicitacao.usuarioSolicitante = new Usuario();
    solicitacao.usuarioSolicitante.id = idUsuario;

    return solicitacao;
  }

  retornarSolicitacaoStatusAtualizado(status: String, solicitacao: SolicitacaoDTO): SolicitacaoCompra {
    let soliciticaoAtualizada = new SolicitacaoCompra();
    soliciticaoAtualizada.id = solicitacao.id;

    if (status == StatusCompra.APROVADO) {
      soliciticaoAtualizada.statusCompra = StatusCompra.APROVADO;
    } else {
      soliciticaoAtualizada.statusCompra = StatusCompra.REPROVADO;
      soliciticaoAtualizada.observacaoReprovacao = this.editReprovaSolicitacaoForm.get('descricaoReprovacao').value;
    }

    soliciticaoAtualizada.preco = solicitacao.preco;
    soliciticaoAtualizada.descricao = solicitacao.descricao;

    soliciticaoAtualizada.usuarioSolicitante = new Usuario();
    soliciticaoAtualizada.usuarioSolicitante.id = solicitacao.usuarioId;

    return soliciticaoAtualizada;
  }

  modificarVisibilidadeModal(modal: String, visibilidade: boolean): void {
    let formAtual!: FormGroup;
    switch (modal) {
      case 'modalCompra': {
        this.modalCompra = visibilidade;
        formAtual = this.addSolicitacaoForm;
        break;
      }
      case 'modalDescricaoReprovacao': {
        this.modalDescricaoReprovacao = visibilidade;
        formAtual = this.editReprovaSolicitacaoForm;
        break;
      }
      case 'modalReprovacao': {
        this.modalReprovacao = visibilidade;
        formAtual = this.filtroSolicitacoesForm;
        break;
      }
    }

    if (!visibilidade) {
      this.limparCamposDoGrupo(formAtual);
    }
  }

  limparCamposDoGrupo(grupo: FormGroup) {
    grupo.reset();
  }

  voltarParaLogin(): void {
    this.router.navigate(['/login']);
  }

  mensagemSucesso(texto: string): void {
    this.message.create('success', texto);
  }
}