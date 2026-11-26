---
description: Revisar o estado do repositório e consolidar/atualizar os arquivos do Memory Bank
---

# Workflow: /memorizar

Verifique o estado atual do repositório (incluindo `git diff` e `git status` se disponível), revise os arquivos em `memory-bank/` e consolide/limpe informações antigas para manter `arquitetura.md`, `decisoes.md` e `contexto-atual.md` atualizados, curtos e sem duplicidades.

## Passos

1. Inspecione o estado do repositório (`git status -sb`, `git diff --stat` e últimos commits via `git log -n 10 --oneline`) para identificar mudanças feitas dentro ou fora do chat.
2. Leia `memory-bank/arquitetura.md`, `memory-bank/decisoes.md` e `memory-bank/contexto-atual.md`.
3. Verifique nos arquivos alterados se houve mudanças em:
   - Estrutura de pastas, endpoints, fluxos ou schema de banco → atualizar `memory-bank/arquitetura.md`.
   - Bibliotecas, padrões técnicos, regras de negócio ou dívidas técnicas → atualizar `memory-bank/decisoes.md`.
   - Status da branch, features concluídas, últimos passos e pendências → atualizar `memory-bank/contexto-atual.md`.
4. Remova informações obsoletas, redundâncias ou detalhes excessivos, mantendo cada arquivo curto, objetivo e em tópicos.
5. Apresente ao usuário um resumo enxuto do que foi consolidado no Memory Bank.
