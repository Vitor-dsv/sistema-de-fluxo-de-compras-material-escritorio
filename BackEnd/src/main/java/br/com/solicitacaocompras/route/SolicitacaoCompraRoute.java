package br.com.solicitacaocompras.route;

import br.com.solicitacaocompras.domain.SolicitacaoCompra;
import br.com.solicitacaocompras.service.SolicitacaoCompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/solicitacao-compra")
public class SolicitacaoCompraRoute {

    @Autowired
    private SolicitacaoCompraService solicitacaoCompraService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody SolicitacaoCompra solicitacaoCompra) {
        return ResponseEntity.ok(solicitacaoCompraService.save(solicitacaoCompra));
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(solicitacaoCompraService.findAll());
    }

    @GetMapping("/filtros")
    public ResponseEntity<?> findWithFilter(@RequestParam(name = "statusCompra", required = false) String statusCompra, @RequestParam(name="nome", required = false) String nome, @RequestParam(name = "descricao", required = false) String descricao) {
        return ResponseEntity.ok(solicitacaoCompraService.searchWithFilters(statusCompra, nome, descricao));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(solicitacaoCompraService.findById(id).get());
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        solicitacaoCompraService.deleteById(id);
        return ResponseEntity.ok(String.format("Solicitação de compra de id %d removido com sucesso!", id));
    }
}
