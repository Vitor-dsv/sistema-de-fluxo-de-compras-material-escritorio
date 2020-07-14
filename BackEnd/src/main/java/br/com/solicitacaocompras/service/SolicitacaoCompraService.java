package br.com.solicitacaocompras.service;

import br.com.solicitacaocompras.domain.SolicitacaoCompra;
import br.com.solicitacaocompras.domain.StatusCompra;
import br.com.solicitacaocompras.repository.SolicitacaoCompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitacaoCompraService {

    @Autowired
    private SolicitacaoCompraRepository solicitacaoCompraRepository;

    public SolicitacaoCompra save(SolicitacaoCompra solicitacaoCompra) {
        return solicitacaoCompraRepository.save(solicitacaoCompra);
    }

    public List<SolicitacaoCompra> searchWithFilters(String status, String nome, String descricao) {
      return solicitacaoCompraRepository.filtrationSolicitation(status, nome, descricao);
    }

    public Optional<SolicitacaoCompra> findById(Long id) {
        return solicitacaoCompraRepository.findById(id);
    }

    public List<SolicitacaoCompra> findAll() {
        return solicitacaoCompraRepository.findAll();
    }

    public void deleteById(Long id) {
        solicitacaoCompraRepository.deleteById(id);
    }
}
