package br.com.solicitacaocompras.repository;

import br.com.solicitacaocompras.domain.SolicitacaoCompra;
import br.com.solicitacaocompras.domain.StatusCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitacaoCompraRepository extends JpaRepository<SolicitacaoCompra, Long> {

    @Query("select " +
                "sc " +
            "from " +
                "SolicitacaoCompra sc " +
            "where " +
                "(:statusCompra is null or sc.statusCompra = :statusCompra) and " +
                "(:nome is null or sc.usuarioSolicitante.nome = :nome) and " +
                "(:descricao is null or sc.descricao = :descricao)")
    List<SolicitacaoCompra> filtrationSolicitation(@Param("statusCompra") String statusCompra, @Param("nome") String nome, @Param("descricao") String descricao);
}
