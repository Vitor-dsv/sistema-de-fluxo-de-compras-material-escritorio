import { TipoUsuario } from './TipoUsuario';
import { SolicitacaoCompra } from './SolicitacaoCompra';

export class Usuario {
    id: Number;
    login: string;
    senha: string;
    nome: string;
    tipo: TipoUsuario;
    solicitacoesCompras: SolicitacaoCompra[]
};