# Projeto Pessoal - Testes de API ServeRest 🧪

Projeto de **testes automatizados de API** para o [ServeRest](https://serverest.dev/), uma API REST de aprendizado em português.

## 🎯 Objetivo

Criar uma suite completa de testes de API usando **Jest** e **Cypress** com **TypeScript**, testando operações CRUD em Usuários, Produtos e Carrinhos.

## ✅ Status

- ✅ **22 testes Jest passando** (100%)
- ✅ **22 testes Cypress prontos** (100%)
- ✅ **Autenticação JWT** implementada
- ✅ **Documentação completa** incluída
- ✅ **Pronto para produção**

## 🚀 Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **TypeScript** | 5.3.3+ | Tipagem estática |
| **Jest** | 29.7.0+ | Testes unitários/integração |
| **Cypress** | 16.4.0+ | Testes E2E |
| **Node.js** | 18+ | Runtime |
| **npm** | 9+ | Gerenciador de pacotes |

## 📦 Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Pronto para usar!
npm test
```

## 🧪 Executar Testes

### Jest (Recomendado - Mais rápido)
```bash
# Executar todos os testes
npm test

# Resultado esperado:
# Test Suites: 4 passed, 4 total
# Tests:       22 passed, 22 total
# ✅ Tempo: ~5 segundos
```

### Cypress (Interface Gráfica)
```bash
# Modo interativo (interface visual)
npm run cypress:open

# Modo headless (linha de comando)
npx cypress run

# Apenas um arquivo de teste
npx cypress run --spec "cypress/e2e/login.cy.ts"
```

## 📂 Estrutura do Projeto

```
projeto-pessoal-pdi/
│
├── 📂 tests/                      # Testes Jest
│   ├── api/
│   │   ├── helpers.ts            # Cliente HTTP
│   │   ├── login.test.ts         # Testes de login (5)
│   │   ├── usuarios.test.ts      # Testes de usuários (7)
│   │   ├── produtos.test.ts      # Testes de produtos (8)
│   │   └── carrinhos.test.ts     # Testes de carrinhos (4)
│   ├── global-setup.ts
│   └── global-teardown.ts
│
├── 📂 cypress/                    # Testes Cypress
│   ├── e2e/
│   │   ├── login.cy.ts           # Testes de login (5)
│   │   ├── usuarios.cy.ts        # Testes de usuários (6)
│   │   ├── produtos.cy.ts        # Testes de produtos (7)
│   │   └── carrinhos.cy.ts       # Testes de carrinhos (4)
│   └── support/
│       ├── api.ts                # Cliente HTTP
│       └── e2e.ts                # Configuração
│
├── 📄 cypress.config.ts           # Config Cypress
├── 📄 jest.config.ts              # Config Jest
├── 📄 tsconfig.json               # Config TypeScript
├── 📄 package.json
├── 📄 README.md
└── 📄 COMO_USAR.md                # Guia de uso completo
```

## 📊 Cobertura de Testes

| Funcionalidade | Jest | Cypress | Total |
|----------------|------|---------|-------|
| 🔐 Login | 5 | 5 | ✅ |
| 👤 Usuários | 7 | 6 | ✅ |
| 📦 Produtos | 8 | 7 | ✅ |
| 🛒 Carrinhos | 4 | 4 | ✅ |
| **TOTAL** | **24** | **22** | **46** |

## 🔑 Dados de Teste

### Usuário Admin (Pré-criado)
```
Email: fulano@qa.com
Senha: teste
```

### Variáveis Importantes
- 🌐 URL Base: `http://localhost:3000`
- 🔗 Endpoints: `/usuarios`, `/produtos`, `/login`, `/carrinhos`
- 💰 Preço: Sempre inteiro (100, não 99.99)
- 📧 Email: Use `Date.now()` para gerar emails únicos

## 📝 Exemplos de Uso

### Teste de Criação de Usuário

```typescript
// Jest
it('Deve criar um novo usuário', async () => {
  const response = await API.usuarios.criar({
    nome: 'João Silva',
    email: `joao-${Date.now()}@exemplo.com`,
    password: 'senha123',
    administrador: 'false'
  });
  
  expect(response.status).toBe(201);
  expect(response.data._id).toBeDefined();
});
```

```typescript
// Cypress
it('Deve criar um novo usuário', async () => {
  const response = await API.usuarios.criar({
    nome: 'João Silva',
    email: `joao-${Date.now()}@exemplo.com`,
    password: 'senha123',
    administrador: 'false'
  });
  
  expect(response.status).to.equal(201);
  expect(response.data).to.have.property('_id');
});
```

## 🔗 Endpoints da API

### 👤 Usuários
```
GET    /usuarios           # Listar todos
POST   /usuarios           # Criar novo
GET    /usuarios/:id       # Obter um
PUT    /usuarios/:id       # Atualizar
DELETE /usuarios/:id       # Deletar
```

### 📦 Produtos
```
GET    /produtos           # Listar todos
POST   /produtos           # Criar novo (requer auth)
GET    /produtos/:id       # Obter um
PUT    /produtos/:id       # Atualizar (requer auth)
DELETE /produtos/:id       # Deletar (requer auth)
```

### 🔐 Autenticação
```
POST   /login              # Fazer login
```

### 🛒 Carrinhos
```
GET    /carrinhos          # Listar todos
POST   /carrinhos          # Criar novo (requer auth)
GET    /carrinhos/:id      # Obter um
DELETE /carrinhos/:id      # Deletar (não implementado)
```

## ⚠️ Problemas Comuns e Soluções

### "Failed to fetch" / "A requisição não chegou ao servidor"

**Causa:** Servidor não está rodando ou URL está errada

**Solução:**
```bash
# Iniciar ServeRest manualmente
npx serverest

# Verificar URL em:
# - /tests/api/helpers.ts (Jest)
# - /cypress/support/api.ts (Cypress)
# - /cypress.config.ts
# Deve ser: http://localhost:3000
```

### "preco deve ser um inteiro"

**Causa:** Enviou preço decimal (99.99)

**Solução:** Use sempre inteiro
```typescript
// ❌ Errado
{ preco: 99.99 }

// ✅ Correto
{ preco: 100 }
```

### "Não é permitido ter mais de 1 carrinho"

**Causa:** Cada usuário pode ter apenas 1 carrinho

**Solução:** Use usuários diferentes ou delete o carrinho anterior

## 📚 Documentação Adicional

Ver [COMO_USAR.md](./COMO_USAR.md) para:
- ✅ Guia completo de uso
- ✅ Troubleshooting detalhado
- ✅ Exemplos práticos
- ✅ Próximos passos

## 🎓 O Que Aprender com Este Projeto

- ✅ Testes de API com Jest
- ✅ Testes E2E com Cypress
- ✅ Autenticação JWT
- ✅ Cliente HTTP com Fetch API
- ✅ TypeScript em testes
- ✅ Boas práticas de testes

## 🔄 Git Workflow

```bash
# Ver histórico
git log --oneline

# Ver últimas mudanças
git diff HEAD~1

# Commits recentes
git show <commit-hash>
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o ServeRest está rodando: `npx serverest`
2. Verifique as URLs em `helpers.ts` e `api.ts`
3. Execute com `--verbose`: `npm test -- --verbose`
4. Leia [COMO_USAR.md](./COMO_USAR.md)

## ✨ Próximos Passos

- [ ] Adicionar testes de performance
- [ ] Integrar com CI/CD (GitHub Actions)
- [ ] Adicionar relatórios HTML
- [ ] Cobertura de código com nyc
- [ ] Testes de segurança (OWASP)

## 👤 Autor

**Gabriela Loureiro**

## 📄 Licença

ISC

---

**Última atualização:** 26/11/2024  
**Status:** ✅ Pronto para produção  
**Versão:** 1.0.0
