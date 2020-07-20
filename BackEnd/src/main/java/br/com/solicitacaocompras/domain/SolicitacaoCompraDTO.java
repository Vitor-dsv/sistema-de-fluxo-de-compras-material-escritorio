package br.com.solicitacaocompras.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SolicitacaoCompraDTO {

    private Long id;

    private String preco;

    private String descricao;

    private StatusCompra statusCompra;

    private String observacaoReprovacao;

    private Long usuarioId;

    private String usuarioNome;

}
