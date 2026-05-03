# API My Menu

A **API My Menu** é o backend responsável pelo gerenciamento de tarefas relacionadas a supermercados, gerindo a lista de compras, categorias e unidades de medida. Este projeto é desenvolvido utilizando Node.js e TypeScript com o framework Express, além de utilizar o Sequelize como ORM para comunicação com um banco de dados MySQL.

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/):** Plataforma de execução para Javascript/Typescript.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do Javascript que adiciona tipagem estática.
- **[Express (v5)](https://expressjs.com/):** Framework web minimalista para construção e roteamento da API.
- **[Sequelize](https://sequelize.org/):** ORM (Object-Relational Mapper) utilizado para gerenciamento do banco de dados relacional.
- **[MySQL](https://www.mysql.com/):** Banco de dados relacional.
- **[tsx](https://github.com/privatenumber/tsx) & [nodemon](https://nodemon.io/):** Utilizados para desenvolvimento, hot-reload e execução do TypeScript (ts-node).
- **[tsc-alias](https://github.com/justkey007/tsc-alias) & [module-alias](https://www.npmjs.com/package/module-alias):** Resolução de caminhos (Path mapping) durante build e runtime.

## 🗂️ Arquitetura e Estrutura de Diretórios

O projeto segue um padrão de arquitetura em camadas (Layered Architecture) focando em separação de responsabilidades (SoC):

- **`/src/api/`**: Camada de entrada (Entrypoint web/HTTP). Contém as rotas (`routes/`) e middlewares (tratamento de erros, validações).
- **`/src/services/`**: Camada de regras de negócio. Orquestra as operações entre a API e as camadas de infraestrutura.
- **`/src/infra/`**: Camada de banco de dados e infraestrutura. 
  - **`models/`**: Definições dos modelos do Sequelize.
  - **`migrations/`**: Arquivos de migração de banco de dados (histórico do DB).
  - **`repository/`**: Camada de abstração que faz a ponte entre a lógica de serviços (`services/`) e o banco de dados (`models/`). Isolam as queries em regras bem definidas.
  - **`config/`**: Configurações de banco (Sequelize).
- **`/src/types/`**: Interfaces e tipos de dados utilizados em toda a aplicação.

## 🧬 Padrões de Código e Boas Práticas

1. **Responsabilidade Única (Single Responsibility Principle):**
   - Rotas recebem requests HTTP e encaminham para serviços.
   - Serviços (`services/`) contêm **apenas regras de negócio** e não lidam com Request/Response diretamente.
   - Repositórios (`infra/repository/`) processam a manipulação direta com o Banco de Dados.

2. **Tipagem Forte:** 
   - A tipagem deve ser declarada em arquivos específicos em `/src/types/` para reaproveitamento em diferentes camadas.
   
3. **Mapeamento de Caminhos (Aliases):**
   - É permitido e encorajado o uso do alias `@/` para importar módulos a fim de evitar `../../../../`, facilitando refatorações futuras.

4. **Tratamento de Erros:**
   - Erros devem ser capturados e manipulados pelo middleware centralizado (`/src/api/middlewares/error-handler/`), garantindo consistência e padronização da resposta da API.

5. **Migrações e Modelos:**
   - Sempre utilize as migrations antes de fazer modificações diretas no banco de dados. Os modelos do TS devem ser o reflexo exato da estrutura definida nas migrations.

6. **Padrões de Nomenclatura (Naming Conventions):**
   - **Variáveis, Atributos e Funções:** Devem ser escritas em `camelCase` (ex: `categoryId`, `getUser`).
   - **Classes, Interfaces e Tipos:** Devem ser escritos em `PascalCase` (ex: `Category`, `MeasuredUnit`).
   - **Constantes Globais e Variáveis de Ambiente:** Devem utilizar `UPPER_SNAKE_CASE` (ex: `DB_HOST`, `PORT`).

7. **Padrões de Commit (Conventional Commits):**
   - Utilize o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) nas mensagens.
   - **Prefixos mais comuns:**
     - `feat:` Nova funcionalidade (feature).
     - `fix:` Correção de bug.
     - `chore:` Atualizações de build, pacotes, ou dependências.
     - `docs:` Alterações e melhorias na documentação.
     - `refactor:` Refatoração de código que não adiciona feature nem corrige bug.
     - `test:` Adição ou modificação de testes.

## ⚙️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 18+ recomendada)
- MySQL configurado e em execução.

### Passos para executar localmente:

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configuração de Variáveis de Ambiente:**
   - Configure o ambiente baseando-se nas credenciais do seu banco de dados MySQL (exemplo usando `.env`). *(Se aplicável: copie `.env.example` para `.env`)*.

3. **Geração e Execução das Migrations:**
   O script de desenvolvimento executa as migrations automaticamente na inicialização, mas você pode criá-las ou rodá-las manualmente:
   ```bash
   npm run migration:generate  # Script para facilitar a criação de uma nova migration
   npm run migrations          # Roda as pendentes
   npm run migration:undo      # Desfaz a última
   ```

4. **Executar a API em modo Desenvolvimento:**
   Executará automaticamente a stack usando nodemon. As `migrations` rodam no start da JVM.
   ```bash
   npm run start:dev
   ```

5. **Build para Produção:**
   Compila o TypeScript (`build`) e resolve os path aliases para JS.
   ```bash
   npm run build
   ```

6. **Rodar em Produção:**
   ```bash
   npm run start
   ```