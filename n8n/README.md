# Workflows n8n de prospecção ativa

## Arquivos

- `workflows/prospeccao-comercial-gmail.json`: pesquisa oportunidades em canais comerciais públicos, qualifica resultados, identifica e-mails quando aparecem nos resultados, personaliza a abordagem e envia pelo Gmail ou cria rascunhos.
- `workflows/monitoramento-respostas-gmail.json`: monitora respostas recentes, identifica sinais de negociação e detecta pedidos de não contato para alimentar a lista de supressão.

## Configuração

1. Importe os dois arquivos JSON no n8n.
2. Crie uma credencial OAuth2 pessoal do Gmail com permissão para ler mensagens, criar rascunhos e enviar e-mails.
3. Substitua `GMAIL_CREDENTIAL_ID` pela credencial Gmail selecionada no n8n.
4. Crie uma API key e um mecanismo de pesquisa programável no Google Custom Search.
5. Configure estas variáveis protegidas no n8n:
   - `GOOGLE_CUSTOM_SEARCH_API_KEY`: chave da API de pesquisa.
   - `GOOGLE_CUSTOM_SEARCH_ENGINE_ID`: identificador do mecanismo de pesquisa.
   - `ALERT_EMAIL`: endereço que receberá alertas.
   - `PROSPECTING_AUTOSEND`: use `false` para criar rascunhos, que é o padrão; altere para `true` somente após revisar os resultados e a política comercial.
   - `PROSPECTING_DAILY_LIMIT`: quantidade máxima de oportunidades por execução, recomendado entre 5 e 10.
   - `SUPPRESSION_EMAILS`: lista separada por vírgulas de endereços que nunca devem receber contato.
   - `PROSPECTING_QUERIES`: lista opcional, separada por vírgulas, de buscas comerciais públicas personalizadas.
6. Execute o workflow manualmente com `PROSPECTING_AUTOSEND=false` e revise os rascunhos antes de ativar o gatilho.

## Proteções aplicadas

A prospecção não consulta nem depende da tabela `solicitacoes_orcamento` ou de qualquer tabela do banco. As oportunidades são obtidas exclusivamente por pesquisa em canais públicos e permanecem no fluxo do n8n.

Antes de criar um contato, o workflow:

- limita a quantidade de resultados por execução;
- remove resultados repetidos pelo e-mail ou domínio;
- consulta mensagens enviadas nos últimos 180 dias no Gmail;
- não envia novamente para e-mail ou página já identificados em envio anterior;
- ignora endereços presentes em `SUPPRESSION_EMAILS`;
- não envia para resultados que não tenham e-mail público identificável;
- usa rascunhos por padrão;
- aplica intervalo de 25 segundos entre envios automáticos.

Quando uma resposta contém pedido de remoção, cancelamento ou não contato, o monitoramento envia um alerta para que o remetente seja adicionado imediatamente a `SUPPRESSION_EMAILS` antes da próxima execução. O n8n não altera variáveis de ambiente automaticamente, evitando que uma execução possa remover ou sobrescrever uma proteção existente.

## Responsabilidade e revisão

A pesquisa deve usar somente informações comerciais publicamente disponibilizadas e respeitar termos de uso, legislação aplicável e pedidos de não contato. O envio automático deve permanecer desativado até que os textos, limites, público e processo de supressão sejam revisados. A credencial do Gmail e as chaves de pesquisa devem permanecer exclusivamente nas credenciais e variáveis protegidas do n8n.