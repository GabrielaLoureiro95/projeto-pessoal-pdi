// tests/api/carrinhos.test.ts
import { API } from './helpers';

describe('API - Carrinhos', () => {
  let carrinhoId: string;
  let usuarioId: string;
  let produtoId: string;

  beforeAll(async () => {
    const usuarioResponse = await API.usuarios.criar({
      nome: 'Usuário Carrinho',
      email: `usuario-carrinho-${Date.now()}@exemplo.com`,
      password: 'senha123',
      administrador: 'false',
    });
    usuarioId = usuarioResponse.data._id;

    const produtoResponse = await API.produtos.criar({
      nome: `Produto para Carrinho ${Date.now()}`,
      preco: 50.00,
      descricao: 'Produto de teste',
      quantidade: 100,
    });
    produtoId = produtoResponse.data._id;
  });

  it('Deve listar todos os carrinhos', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('quantidade');
    expect(response.data).toHaveProperty('carrinhos');
    expect(Array.isArray(response.data.carrinhos)).toBe(true);
  });

  it('Deve criar um novo carrinho', async () => {
    const novoCarrinho = {
      usuarioId,
      produtos: [
        {
          idProduto: produtoId,
          quantidade: 2,
        },
      ],
    };
    const response = await API.carrinhos.criar(novoCarrinho);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('_id');
    carrinhoId = response.data._id;
  });

  it('Deve obter um carrinho específico', async () => {
    const response = await API.carrinhos.obter(carrinhoId);
    expect(response.status).toBe(200);
    expect(response.data._id).toBe(carrinhoId);
  });

  it('Deve deletar um carrinho', async () => {
    const response = await API.carrinhos.deletar(carrinhoId);
    expect(response.status).toBe(200);
  });

  it('Deve retornar erro ao criar carrinho com usuário inválido', async () => {
    const carrinhoInvalido = {
      usuarioId: 'id-invalido',
      produtos: [
        {
          idProduto: produtoId,
          quantidade: 1,
        },
      ],
    };
    const response = await API.carrinhos.criar(carrinhoInvalido);
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await API.usuarios.deletar(usuarioId);
    await API.produtos.deletar(produtoId);
  });
});
