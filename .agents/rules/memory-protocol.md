---
trigger: always_on
---

# Protocolo de Memory Bank

Siga obrigatoriamente estas 3 etapas em todas as interações neste repositório:

1. **Leitura Prévia:** Antes de buscar, listar ou abrir qualquer arquivo de código-fonte, leia os arquivos em `memory-bank/` (`arquitetura.md`, `decisoes.md` e `contexto-atual.md`) para obter contexto imediato do projeto.
2. **Execução Cirúrgica:** Com base no contexto do Memory Bank, abra apenas os arquivos estritamente necessários para resolver a tarefa solicitada, evitando varreduras amplas no repositório.
3. **Auto-Memória Obrigatória:** Sempre que você criar, editar ou apagar qualquer arquivo de código no projeto, você DEVE, automaticamente e sem precisar que o usuário peça, atualizar `memory-bank/contexto-atual.md` (e `memory-bank/decisoes.md` caso haja nova decisão arquitetural ou regra de negócio, além de `memory-bank/arquitetura.md` caso rotas, módulos ou tabelas mudem) como último passo antes de finalizar sua resposta. Mantenha os resumos curtos, objetivos e em tópicos.
