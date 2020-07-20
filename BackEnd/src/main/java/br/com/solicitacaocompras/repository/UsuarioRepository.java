package br.com.solicitacaocompras.repository;

import br.com.solicitacaocompras.domain.SolicitacaoCompra;
import br.com.solicitacaocompras.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends  JpaRepository<Usuario, Long>{

    @Query("select " +
                "user " +
            "from " +
                "Usuario user " +
            "where " +
                "user.login = :login and " +
                "user.senha = :senha")
    Usuario buscarUsuario(@Param("login") String login, @Param("senha") String senha);
}
