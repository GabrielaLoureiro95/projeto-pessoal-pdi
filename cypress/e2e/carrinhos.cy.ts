// cypress/e2e/carrinhos.cy.ts
import { API, setAuthToken, clearAuthToken } from '../support/api';

describe('Testes de API - Carrinhos', () => {
  let produtoId: string;
  let carrinhoId: string;
  const usuarioAdmin = {
    email: 'fulano@qa.com',
    password: 'teste',
  };

  before(async () => {
    // Login and set token
    const loginResponse = await API.login.executar(usuarioAdmin);
    if (loginResponse.status === 200) {
      setAuthToken(loginResponse.data.authorization);
    }

    // Criar um produto para usar nos testes
    const produtoResponse = await API.produtos.criar({
      nome: `Produto para Carrinho ${Date.now()}`,
      preco: 50,
      descricao: 'Produto de teste para carrinho',
      quantidade: 100,
    });
    
    if (produtoResponse.status === 201) {
      produtoId = produtoResponse.data._id;
    }

    // Limpar carrinho existente se houver
    const carrinhos = await API.carrinhos.listar();
    if (carrinhos.data.carrinhos && carrinhos.data.carrinhos.length > 0) {
      carrinhoId = carrinhos.data.carrinhos[0]._id;
    }
  });

  it('Deve listar todos os carrinhos', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('quantidade');
    expect(response.data).to.have.property('carrinhos');
    expect(Array.isArray(response.data.carrinhos)).to.be.true;
  });

  it('Deve criar um novo carrinho com produto', async () => {
    const novoCarrinho = {
      produtos: [
        {
          idProduto: produtoId,
          quantidade: 2,
        },
      ],
    };
    
    const response = await API.carrinhos.criar(novoCarrinho);
    
    // Pode retornar 201 (criado) ou 400 (já existe)
    expect([201, 400]).to.include(response.status);
    
    if (response.status === 201) {
      carrinhoId = response.data._id;
      expect(response.data).to.have.property('_id');
      expect(response.data).to.have.property('message');
    }
  });

  it('Deve listar carrinhos com estrutura válida', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).to.equal(200);
    expect(response.data.carrinhos).to.be.an('array');
    
    // Valida cada carrinho
    response.data.carrinhos.forEach((carrinho: any) => {
      expect(carrinho).to.have.property('_id');
      expect(carrinho).to.have.property('produtos').that.is.an('array');
      expect(carrinho).to.have.property('precoTotal').that.is.a('number');
    });
  });

  it('Deve obter carrinho por ID', async () => {
    // Primeiro obtém um carrinho
    const listResponse = await API.carrinhos.listar();
    
    if (listResponse.data.carrinhos.length > 0) {
      const carrinhoParaObter = listResponse.data.carrinhos[0];
      const response = await API.carrinhos.obter(carrinhoParaObter._id);
      
      expect(response.status).to.equal(200);
      expect(response.data._id).to.equal(carrinhoParaObter._id);
      expect(response.data).to.have.property('produtos').that.is.an('array');
      expect(response.data).to.have.property('precoTotal').that.is.a('number');
    }
  });

  it('Deve calcular preço total corretamente', async () => {
    const response = await API.carrinhos.listar();
    
    response.data.carrinhos.forEach((carrinho: any) => {
      if (carrinho.produtos.length > 0) {
        // Calcula preço esperado
        const precoEsperado = carrinho.produtos.reduce(
          (total: number, prod: any) => total + (prod.precoUnitario * prod.quantidade),
          0
        );
        
        // Valida preço total
        expect(carrinho.precoTotal).to.be.closeTo(precoEsperado, 0.01);
      } else {
        // Carrinho vazio deve ter preço 0
        expect(carrinho.precoTotal).to.equal(0);
      }
    });
  });

  it('Deve validar que carrinho vazio é válido', async () => {
    const response = await API.carrinhos.listar();
    expect(response.status).to.equal(200);
    
    // Mesmo carrinhos vazios devem ter estrutura válida
    response.data.carrinhos.forEach((carrinho: any) => {
      expect(carrinho).to.have.property('_id');
      expect(carrinho).to.have.property('produtos').that.is.an('array');
      expect(carrinho).to.have.property('precoTotal').that.is.a('number');
    });
  });

  after(async () => {
    // Limpa o produto criado
    if (produtoId) {
      await API.produtos.deletar(produtoId).catch(() => {
        // Ignora erro se produto já foi deletado
      });
    }
    clearAuthToken();
  });
});
