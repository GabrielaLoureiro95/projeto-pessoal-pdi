// tests/api/carrinhos.test.ts
import { API, setAuthToken, clearAuthToken } from './helpers';

describe('API - Carrinhos', () => {
  let produtoId: string;
  const usuarioAdmin = {
    email: 'fulano@qa.com',
    password: 'teste',
  };

  beforeAll(async () => {
    const loginResponse = await API.login.executar(usuarioAdmin);
    if (loginResponse.status === 200 && loginResponse.data.authorization) {
      await setAuthToken(loginResponse.data.authorization);
    }

    const produtoResponse = await API.produtos.criar({
      nome: `Produto para Carrinho ${Date.now()}`,
      preco: 50,
      descricao: 'Produto de teste',
      quantidade: 100,
    });
    produtoId = produtoResponse.data._id;
  });

  afterAll(async () => {
    await API.produtos.deletar(produtoId);
    clearAuthToken();
  });

  it('Deve listar todos os carrinhos', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('quantidade');
    expect(response.data).toHaveProperty('carrinhos');
    expect(Array.isArray(response.data.carrinhos)).toBe(true);
  });

  it('Deve validar que carrinho é obtido como lista de objetos com produtos', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).toBe(200);
    
    if (response.data.carrinhos && response.data.carrinhos.length > 0) {
      const carrinho = response.data.carrinhos[0];
      expect(carrinho).toHaveProperty('_id');
      expect(carrinho).toHaveProperty('produtos');
      expect(Array.isArray(carrinho.produtos)).toBe(true);
      
      if (carrinho.produtos.length > 0) {
        const produto = carrinho.produtos[0];
        expect(produto).toHaveProperty('idProduto');
        expect(produto).toHaveProperty('quantidade');
        expect(produto).toHaveProperty('precoUnitario');
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
    const response = await API.carrinhos.criar(novoCarrinho);
    // Esperamos 400 porque o usuário admin já tem um carrinho
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('message');
  });

  it('Deve obter carrinho específico caso exista', async () => {
    const listarResponse = await API.carrinhos.listar();
    
    if (listarResponse.data.carrinhos && listarResponse.data.carrinhos.length > 0) {
      const carrinhoId = listarResponse.data.carrinhos[0]._id;
      const response = await API.carrinhos.obter(carrinhoId);
      expect(response.status).toBe(200);
      expect(response.data._id).toBe(carrinhoId);
    }
  });
});
