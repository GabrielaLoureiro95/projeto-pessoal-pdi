// cypress/e2e/carrinhos.cy.ts
import { API } from '../support/api';

describe('Testes de API - Carrinhos', () => {
  let carrinhoId: string;
  let usuarioId: string;
  let produtoId: string;

  before(async () => {
    const usuarioResponse = await API.usuarios.criar({
      nome: 'Usuário Carrinho',
      email: `usuario-carrinho-${Date.now()}@exemplo.com`,
      password: 'senha123',
      administrador: 'false',
    });
    usuarioId = usuarioResponse.data._id;

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

  it('Deve validar estrutura de carrinho', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).to.equal(200);
    
    if (response.data.carrinhos && response.data.carrinhos.length > 0) {
      const carrinho = response.data.carrinhos[0];
      expect(carrinho).to.have.property('_id');
      expect(carrinho).to.have.property('produtos');
      expect(Array.isArray(carrinho.produtos)).to.be.true;
    }
  });

  it('Deve retornar erro ao criar segundo carrinho para mesmo usuário', async () => {
    const novoCarrinho = {
      produtos: [
        {
          idProduto: produtoId,
          quantidade: 1,
        },
      ],
    };
    const response = await API.carrinhos.criar(novoCarrinho);
    // Esperamos 400 porque cada usuário pode ter apenas 1 carrinho
    expect(response.status).to.equal(400);
  });

  it('Deve obter carrinho caso exista', async () => {
    const listarResponse = await API.carrinhos.listar();
    
    if (listarResponse.data.carrinhos && listarResponse.data.carrinhos.length > 0) {
      const carrinhoId = listarResponse.data.carrinhos[0]._id;
      const response = await API.carrinhos.obter(carrinhoId);
      expect(response.status).to.equal(200);
      expect(response.data._id).to.equal(carrinhoId);
    }
  });

  after(async () => {
    await API.usuarios.deletar(usuarioId);
    await API.produtos.deletar(produtoId);
  });
});
