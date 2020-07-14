import { StatusCompra } from './StatusCompra';
import { Usuario } from './Usuario';

export interface SolicitacaoCompra {
    id: Number,
    preco: String,
    descricao: String,
    statusCompra: StatusCompra,
    usuarioSolicitante: Usuario
};