// cypress/e2e/login.cy.ts
import { API } from '../support/api';

describe('Testes de API - Login', () => {
  const usuarioAdmin = {
    email: 'fulano@qa.com',
    password: 'teste',
  };

  const usuarioNaoExistente = {
    email: 'naoexiste@qa.com',
    password: 'senhaqualquer',
  };

  it('Deve fazer login com usuário válido', async () => {
    const response = await API.login.executar(usuarioAdmin);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('authorization');
    expect(response.data).to.have.property('message').equal('Login realizado com sucesso');
  });

  it('Deve retornar 401 ao fazer login com credenciais inválidas', async () => {
    const response = await API.login.executar(usuarioNaoExistente);
    expect(response.status).to.equal(401);
    expect(response.data).to.have.property('message');
  });

  it('Deve retornar erro ao fazer login sem email', async () => {
    const response = await API.login.executar({
      password: 'teste',
    });
    expect(response.status).to.equal(400);
  });

  it('Deve retornar erro ao fazer login sem password', async () => {
    const response = await API.login.executar({
      email: 'fulano@qa.com',
    });
    expect(response.status).to.equal(400);
  });

  it('Deve retornar um token válido no login', async () => {
    const response = await API.login.executar(usuarioAdmin);
    expect(response.status).to.equal(200);
    expect(response.data.authorization).to.be.a('string');
    expect(response.data.authorization.length).to.be.greaterThan(0);
  });
});
