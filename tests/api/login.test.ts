// tests/api/login.test.ts
import { API } from './helpers';

describe('API - Login', () => {
  const usuarioAdmin = {
    email: 'fulano@qa.com',
    password: 'teste',
  };

  const usuarioNaoExistente = {
    email: `naoexiste-${Date.now()}@qa.com`,
    password: 'senhaqualquer',
  };

  it('Deve fazer login com usuário válido', async () => {
    const response = await API.login.executar(usuarioAdmin);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('authorization');
    expect(response.data.message).toBe('Login realizado com sucesso');
  });

  it('Deve retornar 401 ao fazer login com credenciais inválidas', async () => {
    const response = await API.login.executar(usuarioNaoExistente);
    expect(response.status).toBe(401);
    expect(response.data).toHaveProperty('message');
  });

  it('Deve retornar erro ao fazer login sem email', async () => {
    const response = await API.login.executar({
      password: 'teste',
    });
    expect(response.status).toBe(400);
  });

  it('Deve retornar erro ao fazer login sem password', async () => {
    const response = await API.login.executar({
      email: 'fulano@qa.com',
    });
    expect(response.status).toBe(400);
  });

  it('Deve retornar um token válido no login', async () => {
    const response = await API.login.executar(usuarioAdmin);
    expect(response.status).toBe(200);
    expect(typeof response.data.authorization).toBe('string');
    expect(response.data.authorization.length).toBeGreaterThan(0);
  });
});
