package br.com.solicitacaocompras.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SolicitacaoCompra {

    @Id
    @GeneratedValue(generator = "system-id")
    @GenericGenerator(name = "system-id", strategy = "increment")
    @Column(name = "ID", nullable = false, updatable = false)
    private Long id;

    @Column
    private String preco;

    @Column
    private String descricao;

    @Column
    @Enumerated(EnumType.STRING)
    private StatusCompra statusCompra;

    @Column
    private String observacaoReprovacao;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Solicitante_SolicitacaoCompra")
    private Usuario usuarioSolicitante;
}
