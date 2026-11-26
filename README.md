# Projeto Pessoal - Testes de API ServeRest

Este projeto contém uma suite de testes de API para o [ServeRest](https://serverest.dev/), uma API REST de aprendizado em português.

## 📋 Descrição

Projeto desenvolvido para prática e aprendizado em testes de API, utilizando:
- **Cypress** - Framework de testes
- **TypeScript** - Tipagem estática
- **Fetch API** - Cliente HTTP

## 🚀 Tecnologias

- Node.js
- TypeScript 7.0.2
- Cypress 16.4.0

## 📦 Instalação

```bash
npm install
```

## 🧪 Testes

### Executar todos os testes

```bash
npm test
```

### Abrir Cypress com interface visual

```bash
npm run test:open
```

### Executar testes em modo headed (mostrando navegador)

```bash
npm run test:debug
```

## 📁 Estrutura do Projeto

```
projeto-pessoal-pdi/
├── cypress/
│   ├── e2e/
│   │   ├── usuarios.cy.ts       # Testes de usuários
│   │   ├── produtos.cy.ts       # Testes de produtos
│   │   ├── login.cy.ts          # Testes de autenticação
│   │   └── carrinhos.cy.ts      # Testes de carrinhos
│   ├── support/
│   │   ├── api.ts               # Cliente HTTP e helpers
│   │   ├── e2e.ts               # Configuração do Cypress
│   │   └── commands.d.ts        # Tipos TypeScript
│   └── fixtures/
├── cypress.config.ts             # Configuração do Cypress
├── tsconfig.json
├── package.json
└── README.md
```

## 🔗 Endpoints Testados

### 👤 Usuários
- `GET /api/usuarios` - Listar usuários
- `POST /api/usuarios` - Criar usuário
- `GET /api/usuarios/:id` - Obter usuário
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Deletar usuário

### 📦 Produtos
- `GET /api/produtos` - Listar produtos
- `POST /api/produtos` - Criar produto
- `GET /api/produtos/:id` - Obter produto
- `PUT /api/produtos/:id` - Atualizar produto
- `DELETE /api/produtos/:id` - Deletar produto

### 🔐 Login
- `POST /api/login` - Autenticação de usuários

### 🛒 Carrinhos
- `GET /api/carrinhos` - Listar carrinhos
- `POST /api/carrinhos` - Criar carrinho
- `GET /api/carrinhos/:id` - Obter carrinho
- `DELETE /api/carrinhos/:id` - Deletar carrinho

## 📝 Exemplos de Uso

### Usando o helper de API

```typescript
import { API } from '../support/api';

it('Deve criar um usuário', async () => {
  const response = await API.usuarios.criar({
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    password: 'senha123',
    administrador: 'false'
  });
  
  expect(response.status).to.equal(201);
  expect(response.data._id).to.exist;
});
```

### Requisição customizada

```typescript
import { apiRequest } from '../support/api';

it('Teste customizado', async () => {
  const response = await apiRequest('GET', '/usuarios', {
    headers: { 'X-Custom-Header': 'value' }
  });
  
  expect(response.status).to.equal(200);
});
```

## 🛠️ Desenvolvimento

### Compilar TypeScript

```bash
npm run build
```

### Executar aplicação

```bash
npm start
```

## 📚 Referências

- [ServeRest - Documentação](https://serverest.dev/)
- [Cypress Documentation](https://docs.cypress.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 👤 Autor

Gabriela Loureiro

## 📄 Licença

ISC