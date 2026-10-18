# Workflows n8n de prospecção editorial

## Objetivo e estado atual

Os dois workflows estão desativados e foram configurados para testes seguros. A prospecção pesquisa oportunidades verificáveis de diagramação e projeto gráfico editorial em fontes públicas, registra a URL e a evidência encontrada e cria apenas rascunhos no Gmail. Não há nó de envio automático.

O monitoramento lê mensagens recentes, considera somente respostas de threads que também contêm uma mensagem enviada pelo agente e gera itens de alerta para revisão manual. Ele não envia e-mail, não altera variáveis de ambiente e não modifica o banco de dados.

## Arquivos

- `workflows/prospeccao-comercial-gmail.json`: pesquisa oportunidades editoriais, valida URLs, extrai e-mails públicos quando disponíveis, qualifica evidências, aplica deduplicação, supressão e limite diário e cria rascunhos.
- `workflows/monitoramento-respostas-gmail.json`: identifica respostas em conversas iniciadas pelo agente e classifica interesse, orçamento, reuniões, negociação, recusa e pedido de não contato.

## Configuração protegida

1. Importe os dois arquivos no n8n.
2. Mantenha ambos desativados durante a configuração e revisão.
3. Crie uma credencial OAuth2 do Gmail com permissões para ler mensagens e criar rascunhos. O workflow de monitoramento não precisa enviar mensagens.
4. Substitua `GMAIL_CREDENTIAL_ID` pela credencial selecionada no n8n.
5. Crie uma API key e um mecanismo de pesquisa programável no Google Custom Search.
6. Configure as variáveis protegidas:

- `GOOGLE_CUSTOM_SEARCH_API_KEY`: chave do Google Custom Search.
- `GOOGLE_CUSTOM_SEARCH_ENGINE_ID`: identificador do mecanismo de pesquisa.
- `PORTFOLIO_URL`: URL pública real do portfólio que será incluída nos rascunhos.
- `LANDING_PAGE_URL`: URL pública real da landing page de diagramação editorial.
- `PROSPECTING_DAILY_LIMIT`: limite máximo diário recomendado, entre 5 e 10. O workflow conta mensagens e rascunhos processados nas últimas 24 horas antes de calcular o saldo.
- `SUPPRESSION_EMAILS`: endereços separados por vírgula que nunca devem receber contato.
- `PROSPECTING_QUERIES`: opcional; buscas separadas por vírgulas. Se ausente, são usadas consultas relacionadas a livros, editoras, catálogos, relatórios, revistas, orçamento e projeto gráfico.

Não é necessário configurar `PROSPECTING_AUTOSEND`; o fluxo não contém caminho de envio automático.

## Prospecção e evidências

Cada resultado precisa ter URL HTTP ou HTTPS válida, domínio não pertencente a plataformas bloqueadas e pelo menos dois termos editoriais relevantes. A evidência combina título e trecho retornados pela pesquisa e é gravada no assunto/corpo do rascunho junto com `source_url` e `evidence_url`.

Os resultados são deduplicados por e-mail ou domínio. O workflow ignora resultados sem e-mail público, contatos presentes em `SUPPRESSION_EMAILS`, contatos já encontrados em mensagens ou rascunhos recentes e oportunidades sem `PORTFOLIO_URL` ou `LANDING_PAGE_URL` válidas.

A identificação de duplicidade usa o marcador `[PROSPECCAO-EDITORIAL:chave]` no assunto, além de e-mail, domínio e URL pública. O limite é aplicado depois da leitura do Gmail para evitar ultrapassar o teto diário durante execuções repetidas.

## Monitoramento e conformidade

O monitoramento consulta mensagens dos últimos sete dias e só aceita uma resposta quando o mesmo `threadId` também possui uma mensagem enviada pelo agente. Mensagens recebidas fora dessas conversas são descartadas.

Os alertas estruturados podem indicar:

- interesse;
- orçamento, preço ou valor;
- reunião, agenda ou disponibilidade;
- proposta, escopo, prazo ou negociação;
- recusa;
- pedido de não contato ou remoção.

Pedidos de não contato recebem prioridade alta e instrução para adicionar manualmente o endereço a `SUPPRESSION_EMAILS` antes da próxima execução. O workflow não envia alertas por Gmail para evitar envios reais durante os testes; os itens gerados devem ser encaminhados a um canal de revisão manual posteriormente.

## Testes seguros

1. Valide cada arquivo com um parser JSON antes da importação.
2. Importe os workflows sem ativá-los.
3. Configure valores reais para `PORTFOLIO_URL` e `LANDING_PAGE_URL`, mas mantenha `PROSPECTING_DAILY_LIMIT` entre 1 e 3 no primeiro teste.
4. Execute a prospecção manualmente e confirme que os resultados possuem fonte, evidência, URL válida, e-mail e marcador de duplicidade.
5. Confirme que apenas rascunhos são criados e que não existe operação `send` no workflow.
6. Teste o monitoramento com uma thread de teste que contenha uma mensagem enviada e uma resposta recebida. Confirme a classificação e o alerta estruturado.
7. Verifique uma thread recebida sem mensagem enviada pelo agente e confirme que ela não gera alerta.
8. Revise manualmente texto, base legal, destinatários, supressão e termos de uso das fontes públicas antes de qualquer ativação futura.

## Ativação futura e interrupção

A ativação deve ocorrer somente após revisão jurídica e comercial, conferência das URLs e aprovação dos textos. Mesmo depois da ativação, a criação de rascunhos deve continuar sendo revisada manualmente; não adicione um nó de envio sem uma decisão explícita, limites adicionais e testes controlados.

Para interromper imediatamente, desative os dois workflows no n8n e remova ou invalide as credenciais e chaves de pesquisa. A lista de supressão deve ser mantida manualmente e nunca sobrescrita por uma execução automática.

## Custos e limites

O Google Custom Search pode cobrar por consultas conforme o plano e o volume utilizado. O Gmail está sujeito aos limites da conta e da API. Cada execução pode gerar até dez consultas configuradas, até dez resultados por consulta e apenas o saldo restante do limite diário em rascunhos. O intervalo do gatilho reduz repetição, mas não substitui os limites da API, a revisão humana ou as regras aplicáveis de comunicação comercial.