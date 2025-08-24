# Brev.ly Web 🔗

Uma aplicação web moderna para encurtamento de links, construída com React, TypeScript e TailwindCSS.

## 📖 Sobre o Projeto

O **Brev.ly** é um encurtador de links intuitivo e eficiente que permite aos usuários transformar URLs longas em links curtos e personalizados. A aplicação oferece uma interface clean e responsiva para gerenciar seus links encurtados de forma prática.

### ✨ Funcionalidades

- 🔗 **Encurtamento de Links**: Transforme URLs longas em links curtos e personalizados
- 📋 **Listagem de Links**: Visualize todos os seus links criados em uma interface organizada
- 🗑️ **Exclusão de Links**: Remova links que não são mais necessários
- 📊 **Relatórios CSV**: Exporte relatórios detalhados dos seus links criados
- 📱 **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- ⚡ **Performance Otimizada**: Carregamento rápido e navegação fluida

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://reactjs.org/)** - Biblioteca JavaScript para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vite](https://vitejs.dev/)** - Build tool e servidor de desenvolvimento rápido
- **[TailwindCSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Biome](https://biomejs.dev/)** - Linter e formatador de código

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **pnpm** (gerenciador de pacotes recomendado)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Tiago0Br/brev.ly.git
   cd brev.ly/web
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute o projeto em modo desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Acesse a aplicação**
   
   Abra seu navegador e visite: `http://localhost:5173`

### Scripts Disponíveis

```bash
# Executar em modo desenvolvimento
pnpm dev

# Gerar build de produção
pnpm build

# Visualizar build de produção
pnpm preview

# Formatar código
pnpm format
```

## 📁 Estrutura do Projeto

```
web/
├── public/               # Arquivos estáticos
│   └── vite.svg         # Ícone do Vite
├── src/                 # Código fonte
│   ├── assets/          # Assets da aplicação
│   │   ├── 404.svg      # Ícone de erro 404
│   │   ├── logo-icon.svg # Ícone do logo
│   │   └── logo.svg     # Logo completo
│   ├── app.tsx          # Componente principal da aplicação
│   ├── main.tsx         # Ponto de entrada da aplicação
│   ├── index.css        # Estilos globais
│   └── vite-env.d.ts    # Definições de tipos do Vite
├── biome.json           # Configuração do Biome
├── package.json         # Dependências e scripts
├── vite.config.ts       # Configuração do Vite
├── tsconfig.json        # Configuração do TypeScript
└── README.md           # Documentação do projeto
```

## 🔧 Configuração de Desenvolvimento

### Formatação de Código

O projeto utiliza o **Biome** para formatação e linting do código. Para formatar automaticamente:

```bash
pnpm format
```

### TypeScript

O projeto está configurado com TypeScript para garantir type safety e melhor experiência de desenvolvimento.
