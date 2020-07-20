import { StatusCompra } from './StatusCompra';

export class SolicitacaoDTO {
    id: number;
    preco: string;
    descricao: string;
    statusCompra: StatusCompra;
    observacaoReprovacao: string;
    usuarioId: number;
    usuarioNome: string;
};