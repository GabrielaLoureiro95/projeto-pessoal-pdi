// tests/api/usuarios.test.ts
import { API } from './helpers';

describe('API - Usuários', () => {
  let usuarioId: string;
  const novoUsuario = {
    nome: 'Usuário Teste',
    email: `usuario-${Date.now()}@exemplo.com`,
    password: 'senha123',
    administrador: 'false',
  };

  it('Deve listar todos os usuários', async () => {
    const response = await API.usuarios.listar();
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('quantidade');
    expect(response.data).toHaveProperty('usuarios');
    expect(Array.isArray(response.data.usuarios)).toBe(true);
  });

  it('Deve criar um novo usuário', async () => {
    const response = await API.usuarios.criar(novoUsuario);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('_id');
    expect(response.data.nome).toBe(novoUsuario.nome);
    expect(response.data.email).toBe(novoUsuario.email);
    usuarioId = response.data._id;
  });

  it('Deve obter um usuário específico', async () => {
    const response = await API.usuarios.obter(usuarioId);
    expect(response.status).toBe(200);
    expect(response.data._id).toBe(usuarioId);
    expect(response.data.nome).toBe(novoUsuario.nome);
  });

  it('Deve atualizar um usuário', async () => {
    const usuarioAtualizado = {
      ...novoUsuario,
      nome: 'Usuário Atualizado',
    };
    const response = await API.usuarios.atualizar(usuarioId, usuarioAtualizado);
    expect(response.status).toBe(200);
    expect(response.data.nome).toBe('Usuário Atualizado');
  });

  it('Deve deletar um usuário', async () => {
    const response = await API.usuarios.deletar(usuarioId);
    expect(response.status).toBe(200);
  });

  it('Deve retornar 400 ao criar usuário com email duplicado', async () => {
    const usuario1 = {
      nome: 'Usuário 1',
      email: `email-unico-${Date.now()}@exemplo.com`,
      password: 'senha123',
      administrador: 'false',
    };

    await API.usuarios.criar(usuario1);
    const response = await API.usuarios.criar(usuario1);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('message');
  });
});
