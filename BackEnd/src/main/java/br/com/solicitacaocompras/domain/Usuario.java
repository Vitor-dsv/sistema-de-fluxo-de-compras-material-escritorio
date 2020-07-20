package br.com.solicitacaocompras.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(generator = "system-id")
    @GenericGenerator(name = "system-id", strategy = "increment")
    @Column(name = "ID", nullable = false, updatable = false)
    private Long id;

    @Column
    private String login;

    @Column
    private String senha;

    @Column
    private String nome;

    @Column
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;

    @JsonManagedReference
    @OneToMany(mappedBy = "usuarioSolicitante", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<SolicitacaoCompra> solicitacoesCompras;
}
