# Brev.ly 🔗

Um encurtador de links moderno e eficiente desenvolvido como avaliação de código da **Fase 1** do curso de pós-graduação **"Tech Developer 360"** da Faculdade de Tecnologia Rocketseat.

## 📋 Sobre o Projeto

O **Brev.ly** é uma aplicação web completa para encurtamento de URLs que permite aos usuários:

- ✨ **Criar** links encurtados personalizados
- 📝 **Listar** todos os links criados
- 🗑️ **Excluir** links desnecessários
- 📊 **Exportar** relatórios em CSV dos links criados
- 🔄 **Redirecionar** automaticamente para URLs originais

## 🏗️ Arquitetura do Projeto

O projeto está estruturado em duas partes principais:

```
brevly/
├── web/          # Frontend - Interface do usuário
└── server/       # Backend - API e lógica de negócio
```

### 🎨 Frontend (`/web`)
- **TypeScript** - Tipagem estática
- **React** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server rápido
- **TailwindCSS** - Framework CSS utilitário

### ⚙️ Backend (`/server`)
- **TypeScript** - Tipagem estática
- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **AWS S3** - Armazenamento de arquivos (opcional)

## 🚀 Tecnologias Utilizadas

### Frontend
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

### Backend
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
- ![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat&logo=fastify&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
- ![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)

## 📁 Estrutura do Projeto

### Backend (`/server`)
```
server/
├── src/
│   ├── app/
│   │   └── services/          # Serviços de negócio
│   │       ├── create-link.ts
│   │       └── export-links.ts
│   ├── infra/
│   │   ├── database/          # Configuração do banco
│   │   │   ├── migrations/    # Migrações do banco
│   │   │   └── schemas/       # Esquemas das tabelas
│   │   └── http/             # Servidor HTTP
│   │       ├── server.ts
│   │       └── routes/       # Rotas da API
│   ├── storage/              # Gerenciamento de arquivos
│   └── utils/                # Utilitários
├── docker-compose.yml        # PostgreSQL container
├── drizzle.config.ts         # Configuração do Drizzle ORM
└── package.json
```

### Frontend (`/web`)
```
web/
├── src/
│   ├── assets/               # Imagens e ícones
│   ├── app.tsx              # Componente principal
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── public/
├── index.html
├── vite.config.ts           # Configuração do Vite
└── package.json
```

## 📚 API Endpoints

### Links
- `POST /links` - Criar novo link encurtado
- `GET /links` - Listar todos os links
- `GET /links/export` - Exportar links em CSV
- `DELETE /links/:id` - Excluir link específico
- `GET /:shortCode` - Redirecionar para URL original

### Documentação
- `GET /docs` - Documentação Swagger da API (em desenvolvimento)

## 🧪 Scripts Disponíveis

### Backend (`/server`)
```bash
pnpm dev          # Iniciar servidor de desenvolvimento
pnpm db:generate  # Gerar migrações do banco
pnpm db:migrate   # Executar migrações
pnpm db:studio    # Abrir Drizzle Studio
```

### Frontend (`/web`)
```bash
pnpm dev          # Iniciar servidor de desenvolvimento
pnpm build        # Build para produção
pnpm preview      # Visualizar build de produção
pnpm format       # Formatar código com Biome
```

## 🏃‍♂️ Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Tiago0Br/brev.ly.git
   cd brevly
   ```

2. **Configure e inicie o backend:**
   ```bash
   cd server
   pnpm install
   cp .env.example .env  # Configure as variáveis
   docker-compose up -d  # PostgreSQL
   pnpm db:migrate      # Migrações
   pnpm dev            # Servidor
   ```

3. **Configure e inicie o frontend:**
   ```bash
   cd ../web
   pnpm install
   pnpm dev
   ```

4. **Acesse a aplicação:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3333`

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] Estrutura base do projeto
- [x] Configuração do banco de dados
- [x] API para criação de links
- [x] API para listagem de links
- [x] API para exclusão de links
- [x] Export de relatórios CSV
- [x] Redirecionamento de URLs

### 🚧 Em Desenvolvimento
- [ ] Interface do usuário (React)
- [ ] Validações avançadas
- [ ] Testes automatizados
- [ ] Estatísticas de cliques
- [ ] Autenticação de usuários

---

<div align="center">
  <p>Desenvolvido com ❤️ como parte do curso <strong>Tech Developer 360</strong></p>
  <p><strong>Faculdade de Tecnologia Rocketseat</strong></p>
</div>