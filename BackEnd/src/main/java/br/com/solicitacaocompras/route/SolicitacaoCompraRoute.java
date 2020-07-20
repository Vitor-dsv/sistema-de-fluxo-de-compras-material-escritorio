package br.com.solicitacaocompras.route;

import br.com.solicitacaocompras.domain.SolicitacaoCompra;
import br.com.solicitacaocompras.domain.StatusCompra;
import br.com.solicitacaocompras.service.SolicitacaoCompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;

@RestController
@RequestMapping(value="/solicitacao-compra")
@CrossOrigin("*")
public class SolicitacaoCompraRoute {

    @Autowired
    private SolicitacaoCompraService solicitacaoCompraService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody SolicitacaoCompra solicitacaoCompra) {
        return ResponseEntity.ok(solicitacaoCompraService.save(solicitacaoCompra));
    }

    @PutMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody SolicitacaoCompra solicitacao){
        return ResponseEntity.ok(solicitacaoCompraService.save(solicitacao));
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(solicitacaoCompraService.buscarSolicitacoesCompraPorUsuarioId(null));
    }

    @GetMapping("/por-usuario")
    public ResponseEntity<?> findAll(@RequestParam("usuarioId") Long usuarioId) {
        return ResponseEntity.ok(solicitacaoCompraService.buscarSolicitacoesCompraPorUsuarioId(usuarioId));
    }

    @GetMapping("/filtros")
    public ResponseEntity<?> findWithFilter(@RequestParam(name = "statusCompra", required = false) StatusCompra statusCompra, @RequestParam(name="nome", required = false) String nome, @RequestParam(name = "descricao", required = false) String descricao) {
        return ResponseEntity.ok(solicitacaoCompraService.searchWithFilters(statusCompra, nome, descricao));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(solicitacaoCompraService.findById(id));
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        solicitacaoCompraService.deleteById(id);
        return ResponseEntity.ok(String.format("Solicitação de compra de id %d removido com sucesso!", id));
    }
}