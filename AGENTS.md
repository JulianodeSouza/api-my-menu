# api-my-menu — Regras do Projeto

## Memória do Projeto (Obrigatório)
- **Regra explícita:** Antes de varrer, buscar ou editar qualquer arquivo de código, consulte sempre os arquivos da pasta `memory-bank/` para obter contexto atualizado do repositório:
  - @[arquitetura](memory-bank/arquitetura.md)
  - @[decisoes](memory-bank/decisoes.md)
  - @[contexto-atual](memory-bank/contexto-atual.md)

## Projetos Relacionados
- Frontend (app que consome esta API): `\my-menu` (WSL: `/my-menu`) — React Native/Expo.

## Stack Tecnológica
- **Runtime / API:** Node.js, TypeScript (`strict`), Express 5.
- **Banco de Dados:** MySQL (`mysql2`) + Sequelize 6 (migrations via `sequelize-cli`).
- **Path Alias:** `@/*` → `src/*` em dev (`tsx`) e `build/*` em prod (`tsc-alias` + `module-alias`).
- **Observabilidade:** `@sentry/node` — erros inesperados (`>= 500` e falhas de processo) devem ser reportados ao Sentry.

## Comandos Principais
- **Dev:** `npm run start:dev` (executa migrations + `nodemon` com `tsx`; requer MySQL ativo e `.env`).
- **Build:** `npm run build` (`tsc && tsc-alias`).
- **Produção:** `npm run start` (executa migrations + `node build/app.js`).
- **Migrations:** `npm run migration:generate`, `npm run migrations`, `npm run migration:undo`.
- **Testes:** ainda não configurados (recomendado Jest + Supertest, separando `app` do `listen()` em `src/app.ts`).

## Arquitetura Geral
- Arquitetura em camadas: `src/app.ts` (bootstrap) → `src/api/` (rotas HTTP e `error-handler`) → `src/services/` (regras de negócio + `provider.ts`) → `src/infra/` (`repository/`, `models/`, `migrations/`, `sentry/`) + `src/types/` + `src/utils/`.

## Regras Críticas
- Nunca editar uma migration já aplicada; nunca commitar `.env`.
- `node_modules` é instalado pelo Windows: no WSL, se `node` não existir, use `cmd.exe /c "npm run ..."` e nunca rode `npm install` pelo WSL.
- Siga os padrões de tipagem (`export type I<Nome>` em `src/types/`) e Conventional Commits.

## Especificações e Design (SDD)
- Especificações detalhadas de features, modelos de dados e contratos de endpoints ficam em `docs/specs/` (modelo em `docs/specs/_TEMPLATE.md`).
- Antes de implementar ou alterar um endpoint/regra de negócio, verifique se existe spec em `docs/specs/` e siga o contrato definido nela.
- Ao alterar um contrato de API ou regra de negócio, mantenha a spec correspondente atualizada.
