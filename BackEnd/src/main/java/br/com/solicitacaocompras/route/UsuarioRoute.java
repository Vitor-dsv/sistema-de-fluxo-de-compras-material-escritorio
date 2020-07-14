package br.com.solicitacaocompras.route;

import br.com.solicitacaocompras.domain.Usuario;
import br.com.solicitacaocompras.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/usuario")
public class UsuarioRoute {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioService.save(usuario));
    }

    @GetMapping
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(usuarioService.findById(id).get());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long  id){
        usuarioService.deleteById(id);
        return ResponseEntity.ok(String.format("Usuário de id %d removido com sucesso!", id));
    }
}
