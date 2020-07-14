import { TipoUsuario } from './TipoUsuario';
import { SolicitacaoCompra } from './SolicitacaoCompra';

export interface Usuario {
    id: Number,
    nome: String,
    tipo: TipoUsuario,
    solicitacoesCompra: Array<SolicitacaoCompra>
};