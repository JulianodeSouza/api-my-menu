# Decisões Técnicas e Regras de Negócio — api-my-menu

## Stack e Ferramentas

- **Express 5 (`^5.1.0`)**: rejeições em handlers `async` propagam nativamente ao `errorHandler` sem `try/catch` repetitivo.
- **TypeScript (`strict: true`, `ES2020`, `CommonJS`, `allowJs`/`checkJs`)**: build via `tsc && tsc-alias`; desenvolvimento via `nodemon --exec tsx src/app.ts`.
- **Path Alias `@/*`**: mapeado para `./src/*` no `tsconfig.json` e resolvido para `build/` em produção via `module-alias/register` (ativado condicionalmente quando `NODE_ENV === "production"` em `src/app.ts`).
- **Sequelize 6 + `mysql2`**:
  - `timestamps: false` globalmente (datas de inserção/finalização são gerenciadas manualmente).
  - `timezone: "-03:00"` e `pool: { max: 1 }` configurados em `src/infra/models/index.ts`.
  - Migrations rodam automaticamente no `npm run start` e `npm run start:dev`.
- **Monitoramento (`@sentry/node`)**: centralizado em `src/infra/sentry/index.ts`, integrado ao `errorHandler` (status `>= 500`), `/health` e eventos globais `unhandledRejection` / `uncaughtException`.

## Padrões Arquiteturais e de Código

- **Arquitetura em Camadas**: `Route → Service → Provider → Repository/DefaultProvider → Model`.
  - Rotas tratam apenas HTTP (`req`/`res`).
  - Serviços contêm validação e regra de negócio; operações de escrita ficam em subpastas (`register/`, `edit/`, `delete/`).
  - `DefaultProvider` (`src/services/system/defaultProvider.ts`) é usado para consultas SQL diretas com `JOIN` (ex.: `GET /list-supermarket`).
  - `RepositoryModel` (`src/infra/repository/repository.ts`) abstrai operações padrão do Sequelize (`getAll` ordena por `name ASC`).
- **Tipagem**: usar `export type I<Nome>` (preferência por `type` em vez de `interface`) concentrados em `src/types/`.
- **Tratamento de Erros**: erros esperados lançam `ErrorApi(message, statusCode)`; `errorHandler` padroniza a resposta como `{ data: { message } }`.
- **SDD (Spec-Driven Development)**: contratos Backend ↔ Frontend ficam em `docs/specs/`. Qualquer mudança em contrato ou regra deve manter a spec sincronizada.
- **Ambiente Windows / WSL**: `node_modules` é instalado no Windows; nunca rodar `npm install` pelo WSL (usar `cmd.exe /c "npm run ..."` se necessário). Nunca editar migration já aplicada nem commitar `.env`.

## Regras de Negócio Críticas

- **Lista de Compras (`/list-supermarket`)**:
  - **Listagem ativa**: retorna apenas itens com `active = 1` e `finish_date_purchase IS NULL`, agrupados por categoria (`IListPurchaseView`).
  - **Cadastro**: `name` (não vazio) e `quantity` (`> 0`) são validados via `validateData(data, "register")`.
  - **Marcar item (`mark-item/:id`)**: quando `checked === true`, `totalCaught` e `amount` são obrigatórios e devem ser números finitos `> 0`; quando `checked === false`, `0` é aceito.
  - **Edição (`PUT /:id`)**: aceita atualização parcial ou completa preservando valores `0` e `false`; rejeita ID inválido ou payload sem campos editáveis (`400`).
  - **Exclusão (`DELETE /:id`)**: soft delete (`active = false`), preservando histórico no banco.
  - **Finalizar compra (`finish-purchase`)**: busca todos os itens com `active: true` e atualiza cada um com `active: false` e `finishDatePurchase: new Date()`.
- **Categorias (`/categories`)**:
  - `name` não pode ser vazio; `icon` é opcional e normalizado para `"Tag"` quando omitido, `null` ou vazio (garantido em service, repository, model e migration `20261025155852-alterCategoryIconDefault.js`).
  - Edição valida existência da categoria (`404` se não encontrada).
  - Exclusão é hard delete (`destroy`).
- **Unidades de Medida (`/measuredUnits`)**:
  - Cadastro exige `name` e `unitSymbol` não vazios; edição aceita atualização parcial; exclusão é hard delete (`destroy`).

## Pontos de Atenção / Dívidas Técnicas Identificadas

- **Sentry em produção**: em `src/infra/sentry/index.ts`, a condição `if (!dsn || isSentryInitialized || process.env.NODE_ENV === "production") return;` desabilita o Sentry quando `NODE_ENV === "production"`. Validar antes de contar com alertas em produção.
- **Testes automatizados**: ainda não existem (recomendado Jest + Supertest, extraindo `app` do `listen()` em `src/app.ts`).
- **Inconsistências menores de contrato/código**:
  - `POST /categories`: `CategoriesRegisterService.registerCategory` atualmente retorna `void` (alterado no commit `749b4d4`), divergindo da spec `docs/specs/settings.md` que documenta `{ id, name, icon }`.
  - `PUT /categories/:id`: o controller responde `{ id, ..._req.body }` em vez da variável `updatedCategory` retornada pelo service.
  - `src/api/routes/health/health.ts` existe no repositório, mas `src/api/routes/health/index.ts` implementa o handler inline e não o importa.
  - `finishPurchase()` executa um `UPDATE` por item em loop em vez de um único `UPDATE` em lote.
  - Sem camada de autenticação/autorização implementada atualmente (API aberta, CORS `*`).
