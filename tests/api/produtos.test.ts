// tests/api/produtos.test.ts
import { API } from './helpers';

describe('API - Produtos', () => {
  let produtoId: string;
  const novoProduto = {
    nome: `Produto Teste ${Date.now()}`,
    preco: 99.99,
    descricao: 'Um produto de teste',
    quantidade: 10,
  };

  it('Deve listar todos os produtos', async () => {
    const response = await API.produtos.listar();
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('quantidade');
    expect(response.data).toHaveProperty('produtos');
    expect(Array.isArray(response.data.produtos)).toBe(true);
  });

  it('Deve criar um novo produto', async () => {
    const response = await API.produtos.criar(novoProduto);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('_id');
    expect(response.data.nome).toBe(novoProduto.nome);
    expect(response.data.preco).toBe(novoProduto.preco);
    produtoId = response.data._id;
  });

  it('Deve obter um produto específico', async () => {
    const response = await API.produtos.obter(produtoId);
    expect(response.status).toBe(200);
    expect(response.data._id).toBe(produtoId);
    expect(response.data.nome).toBe(novoProduto.nome);
  });

  it('Deve atualizar um produto', async () => {
    const produtoAtualizado = {
      ...novoProduto,
      nome: 'Produto Atualizado',
      preco: 149.99,
    };
    const response = await API.produtos.atualizar(produtoId, produtoAtualizado);
    expect(response.status).toBe(200);
    expect(response.data.nome).toBe('Produto Atualizado');
    expect(response.data.preco).toBe(149.99);
  });

  it('Deve deletar um produto', async () => {
    const response = await API.produtos.deletar(produtoId);
    expect(response.status).toBe(200);
  });

  it('Deve retornar 400 ao criar produto sem nome', async () => {
    const produtoInvalido = {
      preco: 99.99,
      descricao: 'Produto sem nome',
      quantidade: 5,
    };
    const response = await API.produtos.criar(produtoInvalido);
    expect(response.status).toBe(400);
  });

  it('Deve validar campos obrigatórios do produto', async () => {
    const produtoSemPreco = {
      nome: 'Produto sem preço',
      descricao: 'Teste',
      quantidade: 10,
    };
    const response = await API.produtos.criar(produtoSemPreco);
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('message');
  });
});
