# Workflows n8n de prospecção editorial

## Objetivo e estado atual

Os dois workflows permanecem desativados e configurados para testes seguros. A prospecção consulta fontes públicas pelo Tavily, qualifica oportunidades editoriais, valida evidências, aplica deduplicação e supressão e cria somente rascunhos no Gmail. Não existe nó de envio automático.

O monitoramento consulta mensagens recentes do Gmail, aceita somente respostas em threads que também possuem mensagem enviada pelo agente, classifica sinais comerciais e produz alertas estruturados para revisão manual. Não envia alertas, não grava no banco e não altera o site.

## Arquivos

- `workflows/prospeccao-comercial-gmail.json`: consulta o Tavily, extrai contatos públicos, qualifica oportunidades, aplica validações, deduplicação, supressão e limite diário de três rascunhos.
- `workflows/monitoramento-respostas-gmail.json`: identifica respostas em threads iniciadas pelo agente e classifica interesse, orçamento, reunião, negociação, recusa e pedido de não contato.

## Credenciais no n8n Cloud

1. Importe os dois arquivos no n8n Cloud sem ativá-los.
2. Crie uma credencial HTTP Header Auth para o Tavily.
3. Na credencial do Tavily, use o nome de header exigido pela API, normalmente `x-api-key`, e informe a chave somente no campo secreto da credencial. Nunca coloque a chave no JSON do workflow ou neste README.
4. No nó `Pesquisar fontes públicas com Tavily`, selecione a credencial criada e substitua o identificador visual `TAVILY_HEADER_AUTH_CREDENTIAL_ID` pelo vínculo gerado pelo n8n, se a importação não fizer isso automaticamente.
5. Crie uma credencial OAuth2 do Gmail com permissões para ler mensagens e criar rascunhos.
6. Selecione essa credencial nos nós Gmail e substitua `GMAIL_CREDENTIAL_ID` pelo vínculo gerado pelo n8n, quando necessário.

Os workflows não usam `$env`, chaves embutidas, credenciais secretas no JSON ou configurações dependentes do servidor. Isso evita falhas de importação no n8n Cloud e impede que uma variável ausente altere o comportamento silenciosamente.

## Configurações pendentes

No nó `Aplicar deduplicação, supressão e limite de 3`, substitua apenas os valores de configuração necessários:

- `PORTFOLIO_URL`: URL pública real do portfólio.
- `LANDING_PAGE_URL`: URL pública real da landing page de diagramação editorial.
- `SUPPRESSION_EMAILS`: lista explícita de endereços que nunca devem receber contato.
- `TEST_MODE`: permanece `true` durante a validação.
- `MAX_DAILY_DRAFTS`: permanece em `3`, conforme o limite operacional definido.

As URLs de exemplo fazem o workflow ignorar candidatos até serem substituídas por URLs reais. As consultas editoriais ficam declaradas no nó `Definir buscas editoriais`; elas podem ser ajustadas sem usar variáveis de ambiente.

## Prospecção, contatos e qualificação

Cada resultado do Tavily precisa ter URL HTTP ou HTTPS válida, sem usuário ou senha na URL, domínio não pertencente às plataformas bloqueadas, pelo menos dois termos editoriais relevantes e um sinal comercial como orçamento, proposta, briefing, contratação, prazo ou escopo.

O workflow extrai e-mails somente do título e conteúdo retornados pela busca, valida o formato do endereço, registra título, evidência, fonte, termos correspondentes e pontuação de relevância e não cria rascunho sem e-mail público. O destinatário é usado apenas depois das validações e é limitado a três rascunhos por dia.

A deduplicação combina e-mail, URL pública, domínio e conteúdo das mensagens e rascunhos encontrados no Gmail nas últimas 24 horas. O marcador `[PROSPECCAO-EDITORIAL:...]` também é incluído no assunto para facilitar auditoria manual. A supressão é aplicada antes da criação do rascunho.

## Monitoramento de respostas

O monitoramento lê mensagens dos últimos sete dias, interpreta headers do Gmail quando os campos normalizados não estiverem disponíveis e identifica threads que possuem pelo menos uma mensagem com o label `SENT`. Mensagens recebidas fora dessas threads são descartadas.

Os sinais classificados incluem interesse, orçamento, preço, reunião, agenda, proposta, escopo, prazo, negociação, recusa e pedido de não contato. Cada alerta contém `alert_key`, thread, mensagem, remetente, assunto, trecho, prioridade e ação recomendada. Mensagens repetidas na mesma execução são eliminadas pelo par `message_id` e `thread_id`.

A deduplicação entre execuções depende do histórico de mensagens consultado pelo Gmail. O workflow não cria ou grava uma etiqueta de processamento, pois permanece em modo de teste e não deve alterar a caixa de entrada automaticamente. Para deduplicação persistente entre execuções, será necessária uma etapa posterior aprovada para armazenamento ou etiquetagem controlada.

## Modo de teste e segurança

1. Importe os workflows sem ativá-los.
2. Configure as credenciais no n8n Cloud sem expor valores secretos nos arquivos.
3. Substitua as URLs de exemplo por URLs públicas reais.
4. Mantenha `TEST_MODE = true` e `MAX_DAILY_DRAFTS = 3`.
5. Execute manualmente a prospecção e confirme que apenas rascunhos são criados.
6. Confirme que o assunto contém o marcador, que a evidência e a fonte estão presentes e que não há destinatários suprimidos.
7. Teste o monitoramento com uma thread de teste contendo uma mensagem enviada e uma resposta recebida.
8. Teste também uma mensagem recebida sem mensagem enviada e confirme que ela não gera alerta.
9. Revise manualmente destinatários, evidências, texto, supressão e conformidade antes de qualquer ativação.

Não adicione um nó Gmail de envio. A ativação futura exige decisão explícita, revisão jurídica e comercial, limites adicionais e testes controlados.

## Substituição segura dos workflows

Para atualizar uma instalação existente, exporte uma cópia dos workflows atuais, desative as versões antigas, importe os arquivos corrigidos, selecione novamente as credenciais no n8n Cloud e faça uma execução manual de cada fluxo. Só depois da validação remova a versão anterior.

Os dois arquivos mantêm `active: false`, usam conexões explícitas por nome de nó, não dependem de arquivos locais, não usam `$env`, não alteram páginas, formulários ou banco e não contêm credenciais secretas.

Para interromper imediatamente, desative os dois workflows no n8n Cloud e invalide as chaves nas respectivas telas de credenciais. A lista de supressão deve ser mantida manualmente e nunca sobrescrita por uma execução automática.