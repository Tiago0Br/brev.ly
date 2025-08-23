# Brev.ly Server 🔗

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente
- **[Swagger](https://swagger.io/)** / **[Scalar](https://scalar.com/)** - Documentação da API
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM moderno para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[Biome](https://biomejs.dev/)** - Linter e formatador

## 📝 Roadmap

- [X]  Deve ser possível criar um link
  - [X]  Não deve ser possível criar um link com URL encurtada mal formatada
  - [X]  Não deve ser possível criar um link com URL encurtada já existente
- [X]  Deve ser possível deletar um link
- [X]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [X]  Deve ser possível listar todas as URL’s cadastradas
- [X]  Deve ser possível incrementar a quantidade de acessos de um link
- [X]  Deve ser possível exportar os links criados em um CSV
  - [X]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  - [X]  Deve ser gerado um nome aleatório e único para o arquivo
  - [X]  Deve ser possível realizar a listagem de forma performática
  - [X]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

## 🏗️ Arquitetura do Projeto

```
src/
├── env.ts                 # Configuração de variáveis de ambiente
├── infra/                 # Camada de infraestrutura
│   ├── database/          # Configuração do banco de dados
│   │   └── index.ts
│   └── http/              # Servidor HTTP
│       └── server.ts
```

## 🛠️ Pré-requisitos

- **Node.js** v18+ 
- **pnpm** (gerenciador de pacotes)
- **Docker** e **Docker Compose**

O servidor estará disponível em `http://localhost:3333`

## 📚 Documentação da API

Após iniciar o servidor, a documentação da API estará disponível em:

- **Scalar UI**: `http://localhost:3333/docs`

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL como banco de dados principal. A configuração do Docker Compose já inclui uma instância do PostgreSQL pronta para desenvolvimento.

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia o servidor em modo de desenvolvimento

# Banco de dados
pnpm db:generate  # Gera migrações do banco
pnpm db:push      # Aplica migrações
pnpm db:studio    # Abre o Drizzle Studio

# Qualidade de código
pnpm lint         # Executa o linter
pnpm format       # Formata o código
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3333` |
| `NODE_ENV` | Ambiente de execução | `development` |
| `DB_URL` | URL de conexão com PostgreSQL | - |
| `DB_USER` | Usuário do banco | - |
| `DB_PASSWORD` | Senha do banco | - |
| `DB_NAME` | Nome do banco | - |
| `DB_PORT` | Porta do banco | `5432` |
