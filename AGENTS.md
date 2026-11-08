# api-my-menu — regras do projeto

## Projetos relacionados
- Frontend (app que consome esta API): `\my-menu` (WSL: `/my-menu`) — React Native/Expo.

## Stack
- Express 5, TypeScript, Sequelize 6, MySQL (mysql2). Alias `@` → `build` (module-alias).
- Monitoramento: `@sentry/node` — erros inesperados devem ser reportados ao Sentry.

## Comandos
- Dev: `npm run start:dev` (roda migrations + nodemon com tsx). Precisa do MySQL rodando e do `.env`.
- Build: `npm run build` (tsc + tsc-alias).
- Migrations: `npm run migration:generate`, `npm run migrations`, `npm run migration:undo`.
- Testes automatizados: ainda não existem (sugestão: Jest + Supertest, separando `app` do `listen()` em `src/app.ts`).

## Estrutura
- Entrada: `src/app.ts`. Rotas em `src/api`, regras de negócio em `src/services`, infra/DB em `src/infra`, tipos em `src/types`, utilitários em `src/utils`.

## Regras
- Nunca editar migration já aplicada; nunca commitar `.env`.
- `node_modules` é instalado pelo Windows: no WSL, se `node` não existir, use `cmd.exe /c "npm run ..."` e nunca rode `npm install` pelo WSL.

## Especificações e Design (SDD)
- Especificações detalhadas de features, modelos de dados e contratos de endpoints ficam em `docs/specs/` (modelo em `docs/specs/_TEMPLATE.md`).
- Antes de implementar ou alterar um endpoint/regra de negócio, verifique se existe spec em `docs/specs/` e siga o contrato definido nela.
- Ao alterar um contrato de API ou regra de negócio, mantenha a spec correspondente atualizada.
