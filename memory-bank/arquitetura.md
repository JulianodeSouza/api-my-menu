# Arquitetura — api-my-menu

API REST em Node.js + TypeScript + Express 5 + Sequelize 6 (MySQL) responsável pelo backend do app mobile `my-menu` (React Native/Expo): lista de compras de supermercado, categorias, unidades de medida e health check.

## Mapa de Diretórios

```text
api-my-menu/
├── docs/specs/                # Especificações SDD (contratos Backend ↔ Frontend)
│   ├── _TEMPLATE.md
│   ├── settings.md            # Categorias, unidades e preferências
│   └── shopping-list.md       # Lista de supermercado
├── memory-bank/               # Memória persistente do projeto (arquitetura, decisões, contexto)
└── src/
    ├── instrument.ts          # Preload: module-alias (prod) e initSentry() antes dos imports da aplicação
    ├── app.ts                 # Bootstrap Express, CORS, router, Sentry.setupExpressErrorHandler, errorHandler e listen()
    ├── api/
    │   ├── index.ts           # Monta rotas raiz + CORS de métodos
    │   ├── middlewares/
    │   │   ├── error-handler/ # Middleware centralizado de erros (responde JSON padronizado)
    │   │   └── errors/        # Classe ErrorApi(message, statusCode)
    │   └── routes/            # Handlers HTTP agrupados por domínio
    │       ├── health/        # GET /health (index.ts → health.ts)
    │       ├── supermarket/   # /list-supermarket
    │       ├── categories/    # /categories
    │       └── measuredUnits/ # /measuredUnits
    ├── services/              # Regras de negócio e validações (sem acoplamento ao Express)
    │   ├── purchaseList/      # Leitura/agrupamento + subpastas register/, edit/, delete/ (cada uma com index.ts + provider.ts)
    │   ├── categories/        # Listagem + subpastas register/, edit/, delete/
    │   ├── measuredUnits/     # Listagem + subpastas register/, edit/, delete/
    │   ├── system/            # defaultProvider.ts (queries SQL diretas via sequelize.query)
    │   └── utils/             # logMessage()
    ├── infra/
    │   ├── config/config.js   # Configuração do sequelize-cli (development / production)
    │   ├── migrations/        # 6 migrations Sequelize (tabelas + seeds + alter default icon)
    │   ├── models/            # Conexão Sequelize (index.ts) + entities (category, measuredUnit, listPurchase)
    │   ├── repository/        # RepositoryModel base + repositórios por domínio (categories, measuredUnit, purchaseList)
    │   ├── scripts/           # ask-name-migration.js (helper interativo para gerar migrations)
    │   └── sentry/            # initSentry(), captureError(), export Sentry
    ├── types/                 # Contratos TypeScript (categories.ts, listPurchase.ts, measuredUnit.ts)
    └── utils/                 # validateData.ts (validações de payload da lista de compras)
```

## Fluxo Principal de Dados

```text
HTTP Request
  → src/app.ts (express.json, CORS)
  → src/api/index.ts (prefixo da rota)
  → src/api/routes/<domínio>/ (extrai params/body, chama service, envia resposta)
  → src/services/<domínio>/ (valida entrada, aplica regras de negócio, lança ErrorApi)
  → provider.ts
      ├── Leitura complexa (JOIN): DefaultProvider → sequelize.query (SQL raw)
      └── CRUD padrão: src/infra/repository/ → RepositoryModel → Sequelize Models
  → MySQL
  → Erro lançado? Express 5 encaminha automaticamente → errorHandler → JSON { data: { message } } (+ Sentry se >= 500)
```

## Endpoints Expostos

| Prefixo | Método e Rota | Handler | Descrição |
| :--- | :--- | :--- | :--- |
| `/health` | `GET /health` | `health.ts` | Testa conexão com MySQL (`200` ou `503`) |
| `/list-supermarket` | `GET /list-supermarket` | `supermarket.ts` | Lista itens ativos (`active=1`, `finish_date_purchase IS NULL`) agrupados por categoria |
| `/list-supermarket` | `GET /list-supermarket/item/:id` | `supermarket.ts` | Busca um item específico por ID |
| `/list-supermarket` | `POST /list-supermarket` | `supermarket.ts` | Cadastra novo item (`201`) |
| `/list-supermarket` | `PUT /list-supermarket/:id` | `supermarket.ts` | Edição parcial ou completa do item |
| `/list-supermarket` | `POST /list-supermarket/mark-item/:id` | `supermarket.ts` | Marca/desmarca item no carrinho com `amount` e `totalCaught` |
| `/list-supermarket` | `POST /list-supermarket/finish-purchase` | `supermarket.ts` | Finaliza compra atual (inativa itens ativos e grava `finish_date_purchase`) |
| `/list-supermarket` | `DELETE /list-supermarket/:id` | `supermarket.ts` | Soft delete do item (`active = false`) |
| `/categories` | `GET /categories` | `categories.ts` | Lista categorias ordenadas por nome |
| `/categories` | `POST /categories` | `categories.ts` | Cadastra categoria (`201`, ícone padrão `"Tag"`) |
| `/categories` | `PUT /categories/:id` | `categories.ts` | Edita nome e/ou ícone da categoria |
| `/categories` | `DELETE /categories/:id` | `categories.ts` | Remove categoria (hard delete) |
| `/measuredUnits` | `GET /measuredUnits` | `measuredUnits.ts` | Lista unidades de medida ordenadas por nome |
| `/measuredUnits` | `POST /measuredUnits` | `measuredUnits.ts` | Cadastra unidade de medida |
| `/measuredUnits` | `PUT /measuredUnits/:id` | `measuredUnits.ts` | Edita nome e/ou símbolo (`unitSymbol`) |
| `/measuredUnits` | `DELETE /measuredUnits/:id` | `measuredUnits.ts` | Remove unidade de medida (hard delete) |

## Banco de Dados (MySQL / Sequelize)

- **`category`**: `id` (PK), `name`, `icon` (default `"Tag"`), `insert_datetime`.
- **`measured_unit`**: `id` (PK), `name`, `unit_symbol`, `insert_datetime`.
- **`list_purchase`**: `id` (PK), `name`, `quantity` (REAL), `checked` (BOOLEAN, default `false`), `amount` (REAL, nullable), `totalCaught` (REAL), `insert_datetime`, `active` (BOOLEAN, default `true`), `finish_date_purchase` (DATE, nullable), `id_category` (FK → `category.id`), `id_measured_unit` (FK → `measured_unit.id`).
- **Relacionamentos**: `ListPurchaseEntity.belongsTo(CategoryEntity)` e `ListPurchaseEntity.belongsTo(MeasuredUnitEntity)` (com respectivos `hasMany`).
