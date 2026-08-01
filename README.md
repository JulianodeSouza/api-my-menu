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
   - A tipagem é declarada em arquivos específicos em `/src/types/` para reaproveitamento em diferentes camadas.
   
3. **Mapeamento de Caminhos (Aliases):**
   - É permitido uso do alias `@/` para importar módulos a fim de evitar `../../../../`, facilitando refatorações futuras.

4. **Tratamento de Erros:**
   - Erros são capturados e manipulados pelo middleware centralizado (`/src/api/middlewares/error-handler/`), garantindo consistência e padronização da resposta da API.

5. **Migrações e Modelos:**
   - É sempre utilizado migrations antes de fazer modificações diretas no banco de dados.

6. **Padrões de Nomenclatura (Naming Conventions):**
   - **Variáveis, Atributos e Funções:** São escritas em `camelCase` (ex: `categoryId`, `getUser`).
   - **Classes, Interfaces e Tipos:** São escritos em `PascalCase` (ex: `Category`, `MeasuredUnit`).
   - **Constantes Globais e Variáveis de Ambiente:** São utilizadas `UPPER_SNAKE_CASE` (ex: `DB_HOST`, `PORT`).

7. **Padrões de Commit (Conventional Commits):**
   - Utilizado o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) nas mensagens.
   - **Prefixos mais comuns:**
     - `feat:` Nova funcionalidade (feature).
     - `fix:` Correção de bug.
     - `chore:` Atualizações de build, pacotes, ou dependências.
     - `docs:` Alterações e melhorias na documentação.
     - `refactor:` Refatoração de código que não adiciona feature nem corrige bug.
     - `test:` Adição ou modificação de testes.
