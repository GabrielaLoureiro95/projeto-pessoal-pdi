// cypress/e2e/produtos.cy.ts
import { API } from '../support/api';

describe('Testes de API - Produtos', () => {
  let produtoId: string;
  const novoProduto = {
    nome: `Produto Teste ${Date.now()}`,
    preco: 100,
    descricao: 'Um produto de teste',
    quantidade: 10,
  };

  it('Deve listar todos os produtos', async () => {
    const response = await API.produtos.listar();
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('quantidade');
    expect(response.data).to.have.property('produtos');
    expect(Array.isArray(response.data.produtos)).to.be.true;
  });

  it('Deve criar um novo produto', async () => {
    const response = await API.produtos.criar(novoProduto);
    expect(response.status).to.equal(201);
    expect(response.data).to.have.property('_id');
    expect(response.data).to.have.property('message');
    produtoId = response.data._id;
  });

  it('Deve obter um produto específico', async () => {
    const response = await API.produtos.obter(produtoId);
    expect(response.status).to.equal(200);
    expect(response.data._id).to.equal(produtoId);
  });

  it('Deve atualizar um produto', async () => {
    const produtoAtualizado = {
      ...novoProduto,
      nome: 'Produto Atualizado',
      preco: 150,
    };
    const response = await API.produtos.atualizar(produtoId, produtoAtualizado);
    expect(response.status).to.equal(200);
  });

  it('Deve deletar um produto', async () => {
    const response = await API.produtos.deletar(produtoId);
    expect(response.status).to.equal(200);
  });

  it('Deve retornar 400 ao criar produto sem nome', async () => {
    const produtoInvalido = {
      preco: 100,
      descricao: 'Produto sem nome',
      quantidade: 5,
    };
    const response = await API.produtos.criar(produtoInvalido);
    expect(response.status).to.equal(400);
  });

  it('Deve validar campos obrigatórios do produto', async () => {
    const produtoSemPreco = {
      nome: 'Produto sem preço',
      descricao: 'Teste',
      quantidade: 10,
    };
    const response = await API.produtos.criar(produtoSemPreco);
    expect(response.status).to.equal(400);
  });
});
