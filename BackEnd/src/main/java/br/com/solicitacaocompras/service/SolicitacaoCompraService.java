package br.com.solicitacaocompras.service;

import br.com.solicitacaocompras.domain.SolicitacaoCompra;
import br.com.solicitacaocompras.domain.SolicitacaoCompraDTO;
import br.com.solicitacaocompras.domain.StatusCompra;
import br.com.solicitacaocompras.repository.SolicitacaoCompraRepository;
import jdk.jshell.Snippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitacaoCompraService {

    @Autowired
    private SolicitacaoCompraRepository solicitacaoCompraRepository;

    public SolicitacaoCompra save(SolicitacaoCompra solicitacaoCompra) {
        return solicitacaoCompraRepository.save(solicitacaoCompra);
    }

    public List<SolicitacaoCompraDTO> searchWithFilters(StatusCompra status, String nome, String descricao) {
        List<SolicitacaoCompra> solicitacaoCompras = solicitacaoCompraRepository.filtrationSolicitation(status, nome, descricao);
        return retornarSolicitacaoCompraDto(solicitacaoCompras);
    }

    public Optional<SolicitacaoCompra> findById(Long id) {
        return solicitacaoCompraRepository.findById(id);
    }

    public List<SolicitacaoCompraDTO> buscarSolicitacoesCompraPorUsuarioId(Long usuarioId) {
        List<SolicitacaoCompra> solicitacaoCompras = solicitacaoCompraRepository.buscarSolicitacoesCompra(usuarioId);
        return retornarSolicitacaoCompraDto(solicitacaoCompras);
    }

    public void deleteById(Long id) {
        solicitacaoCompraRepository.deleteById(id);
    }

    private List<SolicitacaoCompraDTO> retornarSolicitacaoCompraDto(List<SolicitacaoCompra> solicitacaoCompras){
        List<SolicitacaoCompraDTO> solicitacaoCompraDTOS = new ArrayList<>();

        if(!CollectionUtils.isEmpty(solicitacaoCompras)) {
            solicitacaoCompraDTOS = solicitacaoCompras.stream()
                    .map(sc ->
                            new SolicitacaoCompraDTO(sc.getId(), sc.getPreco(), sc.getDescricao(), sc.getStatusCompra(),
                                    sc.getObservacaoReprovacao(), sc.getUsuarioSolicitante().getId(), sc.getUsuarioSolicitante().getNome())
                    ).collect(Collectors.toList());

        }
        return solicitacaoCompraDTOS;
    }
}
