// cypress/e2e/usuarios.cy.ts
import { API } from '../support/api';

describe('Testes de API - Usuários', () => {
  let usuarioId: string;
  const novoUsuario = {
    nome: 'Usuário Teste',
    email: `usuario-${Date.now()}@exemplo.com`,
    password: 'senha123',
    administrador: 'false',
  };

  it('Deve listar todos os usuários', async () => {
    const response = await API.usuarios.listar();
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('quantidade');
    expect(response.data).to.have.property('usuarios');
    expect(Array.isArray(response.data.usuarios)).to.be.true;
  });

  it('Deve criar um novo usuário', async () => {
    const response = await API.usuarios.criar(novoUsuario);
    expect(response.status).to.equal(201);
    expect(response.data).to.have.property('_id');
    expect(response.data).to.have.property('message');
    usuarioId = response.data._id;
  });

  it('Deve obter um usuário específico', async () => {
    const response = await API.usuarios.obter(usuarioId);
    expect(response.status).to.equal(200);
    expect(response.data._id).to.equal(usuarioId);
  });

  it('Deve atualizar um usuário', async () => {
    const usuarioAtualizado = {
      ...novoUsuario,
      nome: 'Usuário Atualizado',
    };
    const response = await API.usuarios.atualizar(usuarioId, usuarioAtualizado);
    expect(response.status).to.equal(200);
  });

  it('Deve deletar um usuário', async () => {
    const response = await API.usuarios.deletar(usuarioId);
    expect(response.status).to.equal(200);
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

    expect(response.status).to.equal(400);
    expect(response.data).to.have.property('message');
  });
});
