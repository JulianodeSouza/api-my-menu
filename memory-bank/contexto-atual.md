# Contexto Atual — api-my-menu

- **Branch atual:** `master` (sincronizada com `origin/master`)
- **Último commit de código:** `2a0bd16` (`Merge pull request #9 from JulianodeSouza/feat-observability-logs`)

## Funcionalidades Prontas

- **Lista de Supermercado (`/list-supermarket`)**: CRUD completo, listagem agrupada por categoria, marcação de item no carrinho (`mark-item/:id`) com validação estrita de preço/quantidade, finalização de compra (`finish-purchase`) e soft delete. Spec `docs/specs/shopping-list.md` marcada como *Implementada*.
- **Categorias (`/categories`)**: CRUD completo com ícone padrão `"Tag"` (migration + validação + normalização). Spec `docs/specs/settings.md` marcada como *Implementada*.
- **Unidades de Medida (`/measuredUnits`)**: CRUD completo (`GET`, `POST`, `PUT`, `DELETE`).
- **Health Check (`/health`)**: valida conectividade com o MySQL (`200` / `503`).
- **Observabilidade (`@sentry/node`)**: captura de erros `>= 500` no `errorHandler`, falhas no `/health` e exceções globais do processo.
- **Migrations**: 6 migrations criadas (tabelas `category`, `measured_unit`, `list_purchase`, seeds iniciais de categorias/unidades e default `"Tag"` para `category.icon`).

## Últimos Passos Executados

- **Configuração do Memory Bank**: criados `memory-bank/arquitetura.md`, `memory-bank/decisoes.md`, `memory-bank/contexto-atual.md`, `.agents/rules/memory-protocol.md`, `.agent/workflows/memorizar.md` e atualizado `AGENTS.md`.
- **PR #9 (`feat-observability-logs`)**: adicionado `@sentry/node`, rota `/health` e ajuste em `CategoriesRegisterService` para não retornar payload no cadastro (`749b4d4`).
- **PR #8 (`feat-improve-category-and-shop-list`)**: melhorias nas atualizações parciais de categorias e lista de compras, migration de ícone default `"Tag"` e reforço em `validateData.ts` (`c9ef057`).
- **PR #7 (`feat-add-update-routes`)**: adicionadas rotas `PUT`/`DELETE` para categorias e unidades de medida (`f7e3024`).

## Pendências / Próximos Passos Conhecidos

- Estruturar suíte de testes automatizados (Jest + Supertest, separando `app` do `listen()` em `src/app.ts`).
- Revisar guarda `NODE_ENV === "production"` em `src/infra/sentry/index.ts` e alinhar retornos de `POST/PUT /categories` com `docs/specs/settings.md`.
- Limpar arquivo não utilizado `src/api/routes/health/health.ts` (se não for mais necessário).
