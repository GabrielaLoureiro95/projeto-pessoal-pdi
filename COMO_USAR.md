# 🎯 Projeto Pessoal PDI - Como Usar

## 📋 Visão Geral

Este projeto contém testes automatizados de API para o **ServeRest**, uma API mock para testes. Existem dois tipos de testes:

1. **Jest + TypeScript** - Testes unitários e de integração (`npm test`)
2. **Cypress** - Testes E2E com interface gráfica (`npm run cypress:open` ou `npx cypress run`)

---

## 🚀 Iniciar o Projeto

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Iniciar o ServeRest (servidor de testes)
O ServeRest é iniciado automaticamente pelos scripts de teste, MAS você pode iniciar manualmente se quiser:

```bash
npx serverest
```

Ele rodará em: `http://localhost:3000`

---

## ✅ Executar Testes

### 🧪 Testes com Jest (Recomendado - Mais rápido)
```bash
npm test
```

**Resultado esperado:**
```
Test Suites: 4 passed, 4 total
Tests:       22 passed, 22 total
```

**Tempo:** ~5 segundos

---

### 🌐 Testes com Cypress (Interface Gráfica)

#### Modo Interativo (recomendado para desenvolvimento):
```bash
npm run cypress:open
```

Vai abrir o Cypress UI onde você pode:
- Visualizar os testes em tempo real
- Debugar individualmente
- Ver vídeos de execução
- Inspecionar elementos

#### Modo Headless (linha de comando):
```bash
npx cypress run
```

---

## 🔑 Dados de Teste

### Usuário Admin (pré-criado no ServeRest)
```
Email: fulano@qa.com
Senha: teste
```

### Endpoints da API
Todos em `http://localhost:3000`:
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `GET /usuarios/{id}` - Obter usuário
- `PUT /usuarios/{id}` - Atualizar usuário
- `DELETE /usuarios/{id}` - Deletar usuário
- `POST /login` - Fazer login
- `GET /produtos` - Listar produtos
- `POST /produtos` - Criar produto
- `PUT /produtos/{id}` - Atualizar produto
- `DELETE /produtos/{id}` - Deletar produto
- `GET /carrinhos` - Listar carrinhos
- `POST /carrinhos` - Criar carrinho
- `GET /carrinhos/{id}` - Obter carrinho

---

## ⚠️ Problemas Comuns e Soluções

### ❌ Erro: "Failed to fetch" / "A requisição não chegou ao servidor"

**Causa:** A URL da API está errada

**Solução:**
1. Certifique-se de que o ServeRest está rodando:
   ```bash
   npx serverest
   ```

2. Verifique as configurações:
   - **Jest:** `/tests/api/helpers.ts` - `API_BASE_URL` deve ser `http://localhost:3000`
   - **Cypress:** `cypress.config.ts` - `baseUrl` deve ser `http://localhost:3000`
   - **Cypress:** `/cypress/support/api.ts` - `API_BASE_URL` deve ser `http://localhost:3000`

---

### ❌ Erro: "preco deve ser um inteiro"

**Causa:** Você enviou um preço decimal (99.99) em vez de inteiro (100)

**Solução:** Use sempre números inteiros para preço:
```typescript
// ❌ Errado
{ preco: 99.99 }

// ✅ Correto
{ preco: 100 }
```

---

### ❌ Erro: "Não é permitido ter mais de 1 carrinho"

**Causa:** Cada usuário pode ter apenas 1 carrinho no ServeRest

**Solução:** Você precisa:
1. Usar usuários diferentes para cada carrinho
2. OU deletar o carrinho anterior antes de criar um novo
3. OU use apenas endpoints de leitura (GET) para o mesmo usuário

---

### ❌ Erro: "CORS" ou "Access-Control-Allow-Origin"

**Causa:** Pode ser um problema de CORS se usar um servidor front-end separado

**Solução:**
1. Para desenvolvimento, use `http://localhost:3000` para tudo
2. Se usar um servidor front-end separado, adicione headers CORS no servidor

---

## 📂 Estrutura do Projeto

```
projeto-pessoal-pdi/
├── tests/
│   ├── api/
│   │   ├── helpers.ts          # Cliente HTTP para Jest
│   │   ├── login.test.ts       # Testes de autenticação
│   │   ├── usuarios.test.ts    # Testes de usuários
│   │   ├── produtos.test.ts    # Testes de produtos
│   │   └── carrinhos.test.ts   # Testes de carrinhos
│   ├── global-setup.ts         # Setup global (Jest)
│   └── global-teardown.ts      # Teardown global (Jest)
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.ts         # Testes de login (Cypress)
│   │   ├── usuarios.cy.ts      # Testes de usuários (Cypress)
│   │   ├── produtos.cy.ts      # Testes de produtos (Cypress)
│   │   └── carrinhos.cy.ts     # Testes de carrinhos (Cypress)
│   └── support/
│       ├── api.ts              # Cliente HTTP para Cypress
│       └── e2e.ts              # Setup Cypress
├── cypress.config.ts           # Configuração do Cypress
├── jest.config.ts              # Configuração do Jest
├── tsconfig.json               # Configuração do TypeScript
├── package.json                # Dependências
└── run-tests.sh                # Script para rodar testes
```

---

## 🔐 Autenticação

Os testes automaticamente:
1. Fazem login com o usuário admin
2. Recebem um token JWT
3. Enviam o token em todas as requisições subsequentes

Não é necessário fazer login manualmente nos testes.

---

## 📊 Cobertura de Testes

| Feature | Jest | Cypress | Total |
|---------|------|---------|-------|
| Login | 5 | 5 | ✅ |
| Usuários | 7 | 6 | ✅ |
| Produtos | 8 | 7 | ✅ |
| Carrinhos | 4 | 4 | ✅ |
| **TOTAL** | **24** | **22** | **46** |

---

## 🛠️ Troubleshooting

### Como debugar um teste falhando?

#### Com Jest:
```bash
npm test -- --verbose
# Vê mais detalhes
```

#### Com Cypress:
```bash
npm run cypress:open
# Abre interface gráfica e clica no teste para ver o que acontece
```

---

### Como executar apenas um teste?

#### Jest:
```bash
npm test -- login.test.ts
# Executa apenas testes de login
```

#### Cypress:
```bash
npx cypress run --spec "cypress/e2e/login.cy.ts"
# Executa apenas testes de login
```

---

## 📝 Notas Importantes

1. **ServeRest é estateless** - Cada execução começa do zero
2. **IDs são gerados dinamicamente** - Não use IDs hardcoded
3. **Emails precisam ser únicos** - Use `Date.now()` para gerar emails únicos
4. **Preços devem ser inteiros** - 100, não 99.99
5. **Tokens expiram** - Os testes fazem login antes de cada suite

---

## 🚀 Próximos Passos

1. ✅ Adicionar mais casos de erro
2. ✅ Adicionar testes de performance
3. ✅ Integrar com CI/CD (GitHub Actions)
4. ✅ Adicionar relatórios de cobertura
5. ✅ Criar testes de integração E2E completos

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o ServeRest está rodando
2. Verifique as URLs de configuração
3. Veja os logs do console
4. Execute com `--verbose` para mais informações

---

**Última atualização:** 26/11/2024
**Versão:** 1.0.0
**Status:** ✅ Pronto para produção
