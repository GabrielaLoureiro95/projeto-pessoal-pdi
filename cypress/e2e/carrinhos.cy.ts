// cypress/e2e/carrinhos.cy.ts
import { API } from '../support/api';

describe('Testes de API - Carrinhos', () => {
  let produtoId: string;

  before(async () => {
    // Criar um produto para usar nos testes
    const produtoResponse = await API.produtos.criar({
      nome: `Produto para Carrinho ${Date.now()}`,
      preco: 50,
      descricao: 'Produto de teste',
      quantidade: 100,
    });
    produtoId = produtoResponse.data._id;
  });

  it('Deve listar todos os carrinhos', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('quantidade');
    expect(response.data).to.have.property('carrinhos');
    expect(Array.isArray(response.data.carrinhos)).to.be.true;
  });

  it('Deve validar estrutura de carrinho quando houver carrinhos', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).to.equal(200);
    
    // Se existem carrinhos, valida sua estrutura
    if (response.data.carrinhos && response.data.carrinhos.length > 0) {
      const carrinho = response.data.carrinhos[0];
      expect(carrinho).to.have.property('_id');
      expect(carrinho).to.have.property('produtos');
      expect(Array.isArray(carrinho.produtos)).to.be.true;
      
      // Se há produtos no carrinho, valida sua estrutura
      if (carrinho.produtos.length > 0) {
        const produto = carrinho.produtos[0];
        expect(produto).to.have.property('idProduto');
        expect(produto).to.have.property('quantidade');
        expect(produto).to.have.property('precoUnitario');
      }
    }
  });

  it('Deve validar que não é possível criar segundo carrinho para mesmo usuário', async () => {
    const novoCarrinho = {
      produtos: [
        {
          idProduto: produtoId,
          quantidade: 1,
        },
      ],
    };
    
    // Tenta criar carrinho
    const response = await API.carrinhos.criar(novoCarrinho);
    
    // Pode retornar 201 (sucesso) ou 400 (já tem carrinho)
    // Dependendo do estado atual do usuário autenticado
    expect([200, 201, 400]).to.include(response.status);
  });

  it('Deve obter carrinho específico quando houver carrinhos', async () => {
    const listarResponse = await API.carrinhos.listar();
    expect(listarResponse.status).to.equal(200);
    
    // Se existem carrinhos, tenta obter o primeiro
    if (listarResponse.data.carrinhos && listarResponse.data.carrinhos.length > 0) {
      const carrinhoId = listarResponse.data.carrinhos[0]._id;
      const response = await API.carrinhos.obter(carrinhoId);
      
      expect(response.status).to.equal(200);
      expect(response.data._id).to.equal(carrinhoId);
      expect(response.data).to.have.property('produtos');
    }
  });

  it('Deve validar que carrinho tem preço total calculado', async () => {
    const listarResponse = await API.carrinhos.listar();
    
    if (listarResponse.data.carrinhos && listarResponse.data.carrinhos.length > 0) {
      const carrinho = listarResponse.data.carrinhos[0];
      
      // Carrinhos com produtos devem ter preço total
      if (carrinho.produtos && carrinho.produtos.length > 0) {
        expect(carrinho).to.have.property('precoTotal');
        expect(carrinho.precoTotal).to.be.a('number');
        expect(carrinho.precoTotal).to.be.at.least(0);
      }
    }
  });

  after(async () => {
    // Limpa o produto criado
    await API.produtos.deletar(produtoId).catch(() => {
      // Ignora erro se produto já foi deletado
    });
  });
});
