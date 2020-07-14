package br.com.solicitacaocompras.service;

import br.com.solicitacaocompras.domain.Usuario;
import br.com.solicitacaocompras.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario save(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findById(Long id){
        return usuarioRepository.findById(id);
    }

    public List<Usuario> findAll(){
        return usuarioRepository.findAll();
    }

    public void deleteById(Long id){
        usuarioRepository.deleteById(id);
    }
}
